const FilmDAO = require('../stubs/filmDAOstub');
const Request = require('../stubs/requestStub');
const Response = require('../stubs/responseStub');

const FilmController = require('../../controller/filmController');
const views = require('../../js/configView');

const peliculas = [{
	nombre: "Alien",
	img: 1
}, {
	nombre: "Terminator",
	img: 1
}, {
	nombre: "Shrek 1",
	img: 1
}, {
	nombre: "Shrek 2",
	img: 1
}];

describe('Test Controlador Películas: Buscar por KeyWord', () => {

	const dao = new FilmDAO(peliculas);
	const filmController = new FilmController(dao);

	test('Búsqueda de películas por keyWord cuando la peli existe', async () => {
		const req = new Request();
		const res = new Response();

		req.body.nombreBuscar = "Alien";

		await filmController.postListByKeyWord(req, res);

		// Esperamos que se haya llamado a la función res.render y que se le haya pasado por parámetro lo siguiente
		expect(res.render).toHaveBeenCalledWith(views.index, expect.objectContaining({
			films: expect.arrayContaining([
				peliculas[0]
			])
		}));
	});

	test('Búsqueda de películas por keyWord cuando la peli NO existe', async () => {
		const req = new Request();
		const res = new Response();

		req.body.nombreBuscar = "peli que no existe";

		await filmController.postListByKeyWord(req, res);

		// Esperamos que se llame a request.render con un objeto que tenga un array vacío de films
		expect(res.render).toHaveBeenCalledWith(views.index, expect.objectContaining({
			films: expect.arrayContaining([ ])
		}));
	});

});