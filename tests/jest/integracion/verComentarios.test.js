require('dotenv').config();

const { getPool } = require('../../../database/configDB');

const FilmDAO = require('../../../js/daos/filmDAO');

describe('Test de Integración ver comentarios de una película', () => {

	const pool = getPool();
	const dao = new FilmDAO(pool);
	
	beforeAll(async () => {

		await dao.query(`CREATE TABLE peliculas (
							id int(11) NOT NULL,
							nombre varchar(30) NOT NULL,
							img mediumblob NOT NULL,
							duracion int(11) NOT NULL,
							puntuacion int(11) NOT NULL,
							fechaEstreno date NOT NULL,
							sinopsis text NOT NULL,
							genero varchar(32) NOT NULL
						)`);
		
		await dao.query(`ALTER TABLE peliculas ADD PRIMARY KEY (id)`);
		await dao.query(`ALTER TABLE peliculas MODIFY id int(11) NOT NULL AUTO_INCREMENT`)

		await dao.query(`CREATE TABLE actores (
							id int(11) NOT NULL,
							nombre varchar(30) NOT NULL,
							apellidos varchar(40) NOT NULL
		  				)`);
		
		await dao.query(`CREATE TABLE actores_peliculas (
							id_actor int(11) NOT NULL,
							id_pelicula int(11) NOT NULL
		  				)`);
			
		await dao.query(`CREATE TABLE usuarios (
							id int(11) NOT NULL,
							nombreCompleto varchar(45) NOT NULL,
							username varchar(30) NOT NULL,
							email varchar(255) NOT NULL,
							password varchar(250) NOT NULL
						)`);

		await dao.query(`CREATE TABLE comentarios (
							id int(11) PRIMARY KEY AUTO_INCREMENT,
							id_usuario int(11) NOT NULL,
							id_pelicula int(11) NOT NULL,
							texto varchar(200),
							fecha datetime
						)`);

		await dao.query("DELETE FROM peliculas WHERE id > 0;");
		await dao.query("DELETE FROM usuarios WHERE id > 0;");
		await dao.query("DELETE FROM comentarios WHERE id > 0;");

		await dao.createFilm('Alien: el octavo pasajero', 1, 115, 9, '1979-05-25', 'La tripulación del remolcador espacial Nostromo atiende una señal de socorro y, sin saberlo, sube a bordo una letal forma de vida extraterrestre.', 'Terror');
		await dao.createFilm('Terminator', 2, 200, 8, '1979-05-25', 'La tripulación del remolcador espacial Nostromo atiende una señal de socorro y, sin saberlo, sube a bordo una letal forma de vida extraterrestre.', 'Acción');
		await dao.createUser(1, 'Eustagelio', 'eusta', 'eustagelio@kgmail.com', 'aBcDe1*');
		await dao.createComment(1, 1, 1, 'Amo a mi mamá', '1975-05-25');
		await dao.createComment(2, 1, 2, '', '1979-05-25');
	
	});

	afterAll(async () => {
		await dao.query("DELETE FROM peliculas WHERE id > 0;");
		await dao.query("DELETE FROM usuarios WHERE id > 0;");
		await dao.query("DELETE FROM comentarios WHERE id > 0;");
		await dao.query("DROP TABLE peliculas;");
        await dao.query("DROP TABLE usuarios;");
        await dao.query("DROP TABLE comentarios;");
		await pool.end();
	});

	test('Ver comentarios de una película con comentarios', async () => {
		const id = 1;

		await dao.getFilmCommentaries(id).then(result => {
			expect(result).toEqual(expect.arrayContaining([
				expect.objectContaining({ texto: 'Amo a mi mamá' })
			]))
		});
	});

	test('Ver comentarios de una película sin comentarios', async () => {
		const id = 2;

		await dao.getFilmCommentaries(id).then(result => {
			expect(result).toEqual(expect.arrayContaining([
				expect.objectContaining({ texto: '' })
			]))
		});
	});

});