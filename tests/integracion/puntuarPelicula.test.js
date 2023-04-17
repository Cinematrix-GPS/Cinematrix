require('dotenv').config();

process.env.DB_SCHEMA = 'TestingCinematrix';

const {getPool} = require('../../database/configDB');
const FilmDAO = require('../../js/daos/filmDAO');
const RateDAO = require('../../js/daos/rateDAO');
const UserDAO = require('../../js/daos/userDAO');

describe('Test de integración de puntuar pelicula', () => {

	const pool = getPool();
	const filmDAO = new FilmDAO(pool);
	const rateDAO = new RateDAO(pool);
	const userDAO = new UserDAO(pool);

	beforeAll(async () => {
		await filmDAO.query(`CREATE TABLE peliculas (
                            id int(11) NOT NULL,
                            nombre varchar(60) NOT NULL,
                            img mediumblob NOT NULL,
                            duracion int(11) NOT NULL,
                            puntuacion int(11) NOT NULL,
                            fechaEstreno date NOT NULL,
                            sinopsis text NOT NULL,
                            genero varchar(32) NOT NULL
						)`);
		
		await filmDAO.query(`ALTER TABLE peliculas ADD PRIMARY KEY (id)`);
		await filmDAO.query(`ALTER TABLE peliculas MODIFY id int(11) NOT NULL AUTO_INCREMENT`);
		
        await filmDAO.query(`   CREATE TABLE usuarios (
                                id int(11) NOT NULL,
                                nombreCompleto varchar(45) NOT NULL,
                                username varchar(30) NOT NULL,
                                email varchar(255) NOT NULL,
                                password varchar(250) NOT NULL
                            )`);
        
		await filmDAO.query(`ALTER TABLE usuarios
							ADD PRIMARY KEY (id)`)

		await filmDAO.query(`ALTER TABLE usuarios
							MODIFY id int(11) NOT NULL AUTO_INCREMENT`);

        await filmDAO.query(`   CREATE TABLE puntuaciones (
                                usuario int(11) NOT NULL,
                                pelicula int(11) NOT NULL,
                                puntuacion  int(11) NOT NULL
                            )`);

        await filmDAO.createFilm('Alien: el octavo pasajero', 1, 115, 9, '1979-05-25', 'La tripulación del remolcador espacial Nostromo atiende una señal de socorro y, sin saberlo, sube a bordo una letal forma de vida extraterrestre.', 'Terror');
        await filmDAO.createFilm('Terminator', 2, 200, 8, '1979-05-25', 'La tripulación del remolcador espacial Nostromo atiende una señal de socorro y, sin saberlo, sube a bordo una letal forma de vida extraterrestre.', 'Acción');
		await userDAO.createUser('Alvaro David', 'alvd07', 'alvarod@gmail.com', 'hola');
        await userDAO.createUser('Alejadro Manuel', 'aalexis', 'alalexmanu@gmail.com', 'adios');
        await rateDAO.rate('alvarod@gmail.com', 1, 6);
        await rateDAO.rate('alalexmanu@gmail.com', 2, 5);
        
        
	});

	// Al acabar, borramos la peli que hemos creado y cerramos la conexión
	afterAll(async () => {
		await filmDAO.query("DELETE FROM peliculas WHERE id > 0;");
		await filmDAO.query("DELETE FROM usuarios WHERE id > 0;");
		await filmDAO.query("DELETE FROM puntuaciones WHERE usuario > 0;");
		await filmDAO.query("DROP TABLE peliculas;");
        await filmDAO.query("DROP TABLE usuarios;");
        await filmDAO.query("DROP TABLE puntuaciones;");
		await pool.end();
	});

    test('Puntuar una pelicula', async () =>{

        const idP = 1;
        const emailU = 'alvarod@gmail.com';

        await rateDAO.getUserRate(emailU, idP).then(result => {
            expect(result[0].puntuacion).toEqual(6);
        })

    });

    test('Media de una pelicula', async () =>{

        const idP = 2;
        await rateDAO.rate('alvarod@gmail.com', 2, 8);

        await rateDAO.averageRate(idP).then(result => {
            expect(result[0].puntuacion).toEqual(6.5);
        })

    });

    test('Cambiar puntuacion de una pelicula', async () =>{

        const idP = 2;
        const emailU = 'alalexmanu@gmail.com';

        await rateDAO.getUserRate(emailU, idP).then(result => {
            expect(result[0].puntuacion).toEqual(5);
        })
		
		const idUsuario = (await userDAO.getUser(emailU)).id;
        await rateDAO.updateScore(9, idUsuario, idP);
        

        await rateDAO.getUserRate(emailU, idP).then(result => {
			expect(result[0].puntuacion).toEqual(9);
        })

    });

});