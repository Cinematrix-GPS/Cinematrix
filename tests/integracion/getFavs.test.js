require('dotenv').config();

process.env.DB_SCHEMA = 'TestingCinematrix';

const {getPool} = require('../../database/configDB');
const FavDAO = require('../../js/daos/favDAO');

describe('Test de Integración búsqueda de película por keyword', () => {
		
	const pool = getPool();
	const favDAO = new FavDAO(pool);

	beforeAll(async () => {

		await favDAO.query(`CREATE TABLE usuarios (
			id int(11) NOT NULL,
			nombreCompleto varchar(45) NOT NULL,
			username varchar(30) NOT NULL,
			email varchar(255) NOT NULL,
			password varchar(250) NOT NULL
		)`);

		await favDAO.query(`ALTER TABLE usuarios
					ADD PRIMARY KEY (id)`);

		await favDAO.query(`ALTER TABLE usuarios
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
	});

	afterAll(async () => {
		await favDAO.query(`DROP TABLE favoritos`);
		await favDAO.query(`DROP TABLE peliculas`);
		await favDAO.query(`DROP TABLE usuarios`);
	})


	test('Leer los comentarios de un usuario cuando hay comentarios', async () => {
		
	})

	test('Leer los comentarios de un usuario cuando NO hay comentarios', async () => {
		
	})
});