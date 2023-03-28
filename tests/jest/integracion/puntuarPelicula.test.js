require('dotenv').config();

const {getPool} = require('../../../database/configDB');
const FilmDAO = require('../../../js/daos/filmDAO');

describe('Test de integración de puntuar pelicula', () => {

	const pool = getPool();
	const daoFilm = new FilmDAO(pool);

	beforeAll(async () => {
		await daoFilm.query(`CREATE TABLE peliculas (
                            id int(11) NOT NULL,
                            nombre varchar(60) NOT NULL,
                            img mediumblob NOT NULL,
                            duracion int(11) NOT NULL,
                            puntuacion int(11) NOT NULL,
                            fechaEstreno date NOT NULL,
                            sinopsis text NOT NULL,
                            genero varchar(32) NOT NULL
						)`);
		
		await daoFilm.query(`ALTER TABLE peliculas ADD PRIMARY KEY (id)`);
		await daoFilm.query(`ALTER TABLE peliculas MODIFY id int(11) NOT NULL AUTO_INCREMENT`);
		
        await daoFilm.query(`   CREATE TABLE usuarios (
                                id int(11) NOT NULL,
                                nombreCompleto varchar(45) NOT NULL,
                                username varchar(30) NOT NULL,
                                email varchar(255) NOT NULL,
                                password varchar(250) NOT NULL
                            )`);
        
        await daoFilm.query(`   CREATE TABLE puntuaciones (
                                usuario int(11) NOT NULL,
                                pelicula int(11) NOT NULL,
                                puntuacion  int(11) NOT NULL
                            )`);

        await daoFilm.createFilm('Alien: el octavo pasajero', 1, 115, 9, '1979-05-25', 'La tripulación del remolcador espacial Nostromo atiende una señal de socorro y, sin saberlo, sube a bordo una letal forma de vida extraterrestre.', 'Terror');
        await daoFilm.createFilm('Terminator', 2, 200, 8, '1979-05-25', 'La tripulación del remolcador espacial Nostromo atiende una señal de socorro y, sin saberlo, sube a bordo una letal forma de vida extraterrestre.', 'Acción');
		await daoFilm.createUser(1, 'Alvaro David', 'alvd07', 'alvarod@gmail.com', 'hola');
        await daoFilm.createUser(2, 'Alejadro Manuel', 'aalexis', 'alalexmanu@gmail.com', 'adios');
        await daoFilm.rate('alvarod@gmail.com', 1, 6);
        await daoFilm.rate('alalexmanu@gmail.com', 2, 5);
        
        
	});

	// Al acabar, borramos la peli que hemos creado y cerramos la conexión
	afterAll(async () => {
		await daoFilm.query("DELETE FROM peliculas WHERE id > 0;");
		await daoFilm.query("DELETE FROM usuarios WHERE id > 0;");
		await daoFilm.query("DELETE FROM puntuaciones WHERE usuario > 0;");
		await daoFilm.query("DROP TABLE peliculas;");
        await daoFilm.query("DROP TABLE usuarios;");
        await daoFilm.query("DROP TABLE puntuaciones;");
		await pool.end();
	});

    test('Puntuar una pelicula', async () =>{

        const idP = 1;
        const emailU = 'alvarod@gmail.com';

        await daoFilm.getUserRate(idP, emailU).then(result => {
            expect(result).toEqual(6);
        })

    });

    test('Media de una pelicula', async () =>{

        const idP = 2;
        await daoFilm.rate('alvarod@gmail.com', 2, 8);

        await daoFilm.averageRate(idP).then(result => {
            expect(result.puntuacion).toEqual(6.5);
        })

    });

    test('Cambiar puntuacion de una pelicula', async () =>{

        const idP = 2;
        const emailU = 'alalexmanu@gmail.com';

        await daoFilm.getUserRate(idP, emailU).then(result => {
            expect(result).toEqual(5);
        })

        await daoFilm.updateScore('alalexmanu@gmail.com', 2, 9);

        await daoFilm.getUserRate(idP, emailU).then(result => {
            expect(result).toEqual(9);
        })

    });

});