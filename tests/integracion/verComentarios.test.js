require('dotenv').config();

process.env.DB_SCHEMA = 'TestingCinematrix';

const { getPool } = require('../../database/configDB');

const CommentDAO = require('../../js/daos/commentDAO');
const FilmDAO = require('../../js/daos/filmDAO');
const UserDAO = require('../../js/daos/userDAO');

describe('Test de Integración ver comentarios de una película', () => {

	const pool = getPool();
	const filmDAO = new FilmDAO(pool);
	const userDAO = new UserDAO(pool);
	const commentDAO = new CommentDAO(pool)
	
	beforeAll(async () => {

		await filmDAO.query(`CREATE TABLE peliculas (
							id int(11) NOT NULL,
							nombre varchar(30) NOT NULL,
							img mediumblob NOT NULL,
							duracion int(11) NOT NULL,
							puntuacion int(11) NOT NULL,
							fechaEstreno date NOT NULL,
							sinopsis text NOT NULL,
							genero varchar(32) NOT NULL
						)`);
		
		await filmDAO.query(`ALTER TABLE peliculas ADD PRIMARY KEY (id)`);
		await filmDAO.query(`ALTER TABLE peliculas MODIFY id int(11) NOT NULL AUTO_INCREMENT`)

		await filmDAO.query(`CREATE TABLE actores (
							id int(11) NOT NULL,
							nombre varchar(30) NOT NULL,
							apellidos varchar(40) NOT NULL
		  				)`);
		
		await filmDAO.query(`CREATE TABLE actores_peliculas (
							id_actor int(11) NOT NULL,
							id_pelicula int(11) NOT NULL
		  				)`);
			
		await filmDAO.query(`CREATE TABLE usuarios (
							id int(11) NOT NULL,
							nombreCompleto varchar(45) NOT NULL,
							username varchar(30) NOT NULL,
							email varchar(255) NOT NULL,
							password varchar(250) NOT NULL
						)`);

		await filmDAO.query(`CREATE TABLE comentarios (
							id int(11) PRIMARY KEY AUTO_INCREMENT,
							id_usuario int(11) NOT NULL,
							id_pelicula int(11) NOT NULL,
							texto varchar(200),
							fecha datetime
						)`);

		await filmDAO.query(`ALTER TABLE usuarios
							ADD PRIMARY KEY (id)`)

		await filmDAO.query(`ALTER TABLE usuarios
							MODIFY id int(11) NOT NULL AUTO_INCREMENT`);

		await filmDAO.query("DELETE FROM peliculas WHERE id > 0;");
		await filmDAO.query("DELETE FROM usuarios WHERE id > 0;");
		await filmDAO.query("DELETE FROM comentarios WHERE id > 0;");

		await filmDAO.createFilm('Alien: el octavo pasajero', 1, 115, 9, '1979-05-25', 'La tripulación del remolcador espacial Nostromo atiende una señal de socorro y, sin saberlo, sube a bordo una letal forma de vida extraterrestre.', 'Terror');
		await filmDAO.createFilm('Terminator', 2, 200, 8, '1979-05-25', 'La tripulación del remolcador espacial Nostromo atiende una señal de socorro y, sin saberlo, sube a bordo una letal forma de vida extraterrestre.', 'Acción');
		await userDAO.createUser({
			nombreCompl: 'Eustalegio',
			username: 'eusta',
			correo:'eustalegio@kgmail.com',
			pass: 'aBcDe1'
		});
		await commentDAO.createComment(1, 1, 1, 'Amo a mi mamá', '1975-05-25');
		await commentDAO.createComment(2, 1, 2, '', '1979-05-25');
	
	});

	afterAll(async () => {
		await filmDAO.query("DELETE FROM peliculas WHERE id > 0;");
		await filmDAO.query("DELETE FROM usuarios WHERE id > 0;");
		await filmDAO.query("DELETE FROM comentarios WHERE id > 0;");
		await filmDAO.query("DROP TABLE peliculas;");
        await filmDAO.query("DROP TABLE usuarios;");
        await filmDAO.query("DROP TABLE comentarios;");
		await filmDAO.query("DROP TABLE actores_peliculas;");
		await filmDAO.query("DROP TABLE actores;");
		await pool.end();
	});

	test('Ver comentarios de una película con comentarios', async () => {
		const id = 1;

		await commentDAO.getFilmCommentaries(id).then(result => {
			expect(result).toEqual(expect.arrayContaining([
				expect.objectContaining({ texto: 'Amo a mi mamá' })
			]))
		});
	});

	test('Ver comentarios de una película sin comentarios', async () => {
		const id = 2;

		await commentDAO.getFilmCommentaries(id).then(result => {
			expect(result).toEqual(expect.arrayContaining([
				expect.objectContaining({ texto: '' })
			]))
		});
	});

});