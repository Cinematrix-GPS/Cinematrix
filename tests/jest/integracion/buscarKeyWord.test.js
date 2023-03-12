const FilmController = require('../../../controller/filmController');

require('dotenv').config();

const {getPool} = require('../../../database/configDB');
const FilmDAO = require('../../../js/daos/filmDAO');

describe('Test de Integración búsqueda de película por keyword', () => {
	const pool = getPool();
	const dao = new FilmDAO(pool);

	// Creamos una película antes de todo
	beforeAll(async () => {
		await dao.query("DELETE FROM peliculas WHERE id>0;");
		await dao.createFilm('Alien: el octavo pasajero', 1, 115, 9, '1979-05-25', 'La tripulación del remolcador espacial Nostromo atiende una señal de socorro y, sin saberlo, sube a bordo una letal forma de vida extraterrestre.', 'Terror');
	});

	// Al acabar, borramos la peli que hemos creado y cerramos la conexión
	afterAll(async () => {
		await dao.query("DELETE FROM peliculas WHERE id>0;");
		await pool.end();
	});


	test('Búsqueda de películas por keyWord (título) cuando la peli existe', async () => {
		const peli = "Alien";

		await dao.listFilms(peli).then(result => {
			expect(result).toEqual(expect.arrayContaining([
				expect.objectContaining({
					nombre: "Alien: el octavo pasajero"
				})
			]))
		});		
	});

	test('Búsqueda de películas por keyWord cuando la peli NO existe', async () => {
		const peli = "peli que no existe";

		await dao.listFilms(peli).then(result => {
			expect(result).toHaveLength(0);
		});	
	});

	test('Búsqueda de películas por keyWord(género) cuando la peli existe', async () => {
		const peli = "Terror";

		await dao.listFilms(peli).then(result => {
			expect(result).toEqual(expect.arrayContaining([
				expect.objectContaining({
					nombre: "Alien: el octavo pasajero"
				})
			]))
		});	
	});

	test('Búsqueda de películas por keyWord(sinopsis) cuando la peli existe', async () => {
		const peli = "socorro";

		await dao.listFilms(peli).then(result => {
			expect(result).toEqual(expect.arrayContaining([
				expect.objectContaining({
					nombre: "Alien: el octavo pasajero"
				})
			]))
		});	
	});
});