process.env.NODE_ENV = 'testing';

const Request = require('../stubs/requestStub');
const Response = require('../stubs/responseStub');

const FilmController = require('../../controller/filmController');
const views = require('../../js/configView');
const DAOFactory = require('../../js/daos/DAOFactory');

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

	new DAOFactory().getFilmDAO().setDAOData(peliculas);
	
	const filmController = new FilmController();

	test('Búsqueda de películas por keyWord cuando la peli existe', async () => {
		const req = new Request();
		const res = new Response();

		req.body.nombreBuscar = "Alien";
		req.body.busqueda=0;
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
		req.body.busqueda=0;

		await filmController.postListByKeyWord(req, res);

		// Esperamos que se llame a request.render con un objeto que tenga un array vacío de films
		expect(res.render).toHaveBeenCalledWith(views.index, expect.objectContaining({
			films: expect.arrayContaining([ ])
		}));
	});

});