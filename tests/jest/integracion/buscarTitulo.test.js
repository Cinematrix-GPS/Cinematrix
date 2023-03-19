const FilmController = require('../../../controller/filmController');

require('dotenv').config();

const {getPool} = require('../../../database/configDB');
const FilmDAO = require('../../../js/daos/filmDAO');

describe('Test de integración de búsqueda por título', () => {

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
		
		await dao.createFilm('Alien: el octavo pasajero', 1, 115, 9, '1979-05-25', 'La tripulación del remolcador espacial Nostromo atiende una señal de socorro y, sin saberlo, sube a bordo una letal forma de vida extraterrestre.', 'Terror');
	});

	// Al acabar, borramos la peli que hemos creado y cerramos la conexión
	afterAll(async () => {
		await dao.query("DELETE FROM peliculas WHERE id>0");

		await dao.query("DROP TABLE peliculas");

		await pool.end();
	});

	test('Búsqueda de película por título cuando la peli existe: test 1', async () => {
		const peli = "Alien";

		await dao.listFilmsByTitle(peli).then(result => {
			expect(result).toEqual(expect.arrayContaining([
				expect.objectContaining({
					nombre: "Alien: el octavo pasajero"
				})
			]))
		});
	});

	test('Búsqueda de película por título cuando la peli existe: test 2', async () => {
		const peli = "octavo";

		await dao.listFilmsByTitle(peli).then(result => {
			expect(result).toEqual(expect.arrayContaining([
				expect.objectContaining({
					nombre: "Alien: el octavo pasajero"
				})
			]))
		});
	});

	test('Búsqueda de película por título cuando la peli existe: test 3', async () => {
		const peli = "alien";

		await dao.listFilmsByTitle(peli).then(result => {
			expect(result).toEqual(expect.arrayContaining([
				expect.objectContaining({
					nombre: "Alien: el octavo pasajero"
				})
			]))
		});
	});

	test('Búsqueda de películas por título cuando la peli NO existe', async () => {
		const peli = "peli que no existe";

		await dao.listFilmsByTitle(peli).then(result => {
			expect(result).toHaveLength(0);
		});	
	});
});