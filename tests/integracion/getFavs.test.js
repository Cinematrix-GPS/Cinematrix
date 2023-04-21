require('dotenv').config();

process.env.DB_SCHEMA = 'TestingCinematrix';

const {getPool} = require('../../database/configDB');
const FavDAO = require('../../js/daos/favDAO');
const UserDAO = require('../../js/daos/userDAO');
const FilmDAO = require('../../js/daos/filmDAO');

describe('Test de Integración búsqueda de película por keyword', () => {
		
	const pool = getPool();

	const favDAO = new FavDAO(pool);
	const userDAO = new userDAO(pool);
	const filmDAO = new filmDAO(pool);

	beforeAll(async () => {

		await userDAO.query(`CREATE TABLE usuarios (
			id int(11) NOT NULL,
			nombreCompleto varchar(45) NOT NULL,
			username varchar(30) NOT NULL,
			email varchar(255) NOT NULL,
			password varchar(250) NOT NULL
		)`);

		await userDAO.query(`ALTER TABLE usuarios
					ADD PRIMARY KEY (id)`);

		await userDAO.query(`ALTER TABLE usuarios
					MODIFY id int(11) NOT NULL AUTO_INCREMENT`);

		await userDAO.query(`ALTER TABLE usuarios
							MODIFY id int(11) NOT NULL AUTO_INCREMENT`);

		await favDAO.query(`CREATE TABLE favoritos (
							id_usuario int NOT NULL,
		   					id_pelicula int NOT NULL,
		   					PRIMARY KEY (id_usuario, id_pelicula),
		   					FOREIGN KEY (id_usuario) REFERENCES usuarios (id) ON DELETE CASCADE ON UPDATE CASCADE,
		   					FOREIGN KEY (id_pelicula) REFERENCES peliculas (id) ON DELETE CASCADE ON UPDATE CASCADE)`);

		await favDAO.query(`CREATE TABLE peliculas (
							id int(11) NOT NULL,
							nombre varchar(30) NOT NULL,
							img mediumblob NOT NULL,
							duracion int(11) NOT NULL,
							puntuacion int(11) NOT NULL,
							fechaEstreno date NOT NULL,
							sinopsis text NOT NULL,
							genero varchar(32) NOT NULL)`);

		await filmDAO.createFilm('Terminator', 2, 200, 8, '1979-05-25', 'La tripulación del remolcador espacial Nostromo atiende una señal de socorro y, sin saberlo, sube a bordo una letal forma de vida extraterrestre.', 'Acción');
		await filmDAO.createFilm('Alien: el octavo pasajero', 1, 115, 9, '1979-05-25', 'La tripulación del remolcador espacial Nostromo atiende una señal de socorro y, sin saberlo, sube a bordo una letal forma de vida extraterrestre.', 'Terror');

		await userDAO.createUser({
			nombreCompl: 'angel',
			username: 'angel',
			correo:'angel@gps.es',
			pass: 'AYAYAY'
		});

		await userDAO.createUser({
			nombreCompl: 'persona random',
			username: 'ranPerson',
			correo:'ranPer@gmail.com',
			pass: 'pass'
		});

		await userDAO.createUser({
			nombreCompl: 'persona random2',
			username: 'ranPerson2', 
			correo:'ranPer2@gmail.com',
			pass: 'pass'
		});

		await favDAO.query(`INSERT INTO favoritos VALUES(1, 1)`);
		await favDAO.query(`INSERT INTO favoritos VALUES(2, 1)`);
		await favDAO.query(`INSERT INTO favoritos VALUES(2, 2)`);

	});

	afterAll(async () => {
		await favDAO.query(`DROP TABLE favoritos`);
		await favDAO.query(`DROP TABLE peliculas`);
		await favDAO.query(`DROP TABLE usuarios`);
	})

	test('Leer los comentarios de un usuario cuando hay comentarios', async () => {
		await favDAO.listFavByUser(2).then(result => {
			expect(result).toContain(expect.objectContaining({nombre: 'Terminator'}));
			expect(result).toContain(expect.objectContaining({nombre: 'Alien: el octavo pasajero'}));
		});
	})

	test('Leer los comentarios de un usuario cuando NO hay comentarios', async () => {
		await favDAO.listFavByUser(2).then(result => {
			expect(result).toHaveLength(0);
		});
	})	
});