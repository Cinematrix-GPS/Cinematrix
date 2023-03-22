const FilmController = require('../../../controller/filmController');

require('dotenv').config();

const {getPool} = require('../../../database/configDB');

const FilmDAO = require('../../../js/daos/filmDAO');

describe('Test de Integración ver comentarios de una película', () => {

	const pool = getPool();
	const dao = new FilmDAO(pool);
	
	// Creamos una película antes de todo
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
		
		await dao.query(`CREATE TABLE actores_peliculas (
							id_actor int(11) NOT NULL,
							id_pelicula int(11) NOT NULL
		  				)`);

		await dao.query(`CREATE TABLE actores (
							id int(11) NOT NULL,
							nombre varchar(30) NOT NULL,
							apellidos varchar(40) NOT NULL
		  				)`)

		await dao.query("DELETE FROM peliculas WHERE id > 0;");
		await dao.createFilm('Alien: el octavo pasajero', 1, 115, 9, '1979-05-25', 'La tripulación del remolcador espacial Nostromo atiende una señal de socorro y, sin saberlo, sube a bordo una letal forma de vida extraterrestre.', 'Terror');
	});

	// Al acabar, borramos la peli que hemos creado y cerramos la conexión
	afterAll(async () => {
		await dao.query("DELETE FROM peliculas WHERE id > 0;");
		await pool.end();
	});

	test('Ver comentarios cuando la película existe', async () => {
		const peli = "Alien";

		await dao.listFilms(peli).then(result => {
			expect(result).toEqual(expect.arrayContaining([
				expect.objectContaining({
					nombre: "Alien: el octavo pasajero"
				})
			]))
		});		
	});

	test('Ver comentarios cuando la película no existe', async () => {
		const peli = "peli que no existe";

		await dao.listFilms(peli).then(result => {
			expect(result).toHaveLength(0);
		});	
	});

});