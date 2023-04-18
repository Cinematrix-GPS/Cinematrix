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

describe('Tests Controlador Películas: Buscar por Título', () => {

	new DAOFactory().getFilmDAO().setDAOData(peliculas);
	
	const filmController = new FilmController();

	test('Búsqueda por título cuando la película existe', async () => {
		const req = new Request();
		const res = new Response();

		req.body.titulo = "Shrek";

		await filmController.postListByKeyWord(req, res);

		// Esperamos que el controlador haya llamado a la función render con la vista que esperamos y
		// los datos que esperamos

		expect(res.render).toHaveBeenCalledWith(views.index, expect.anything());

		// Obtenemos el objeto con el que se ha llamado a la función render
		const objetoCapturado = res.render.mock.calls[0][1].films; // Primera llamada, segundo parámetro

		expect(objetoCapturado).toContain(peliculas[3]);
	});
	
	test('Búsqueda por título cuando la película no existe', async () => {
		const req = new Request();
		const res = new Response();

		// Nombre de una película que no existe
		req.body.titulo = "Película que no existe";

		await filmController.postListByKeyWord(req, res);
		
		// Nos fijamos en que la vista a la que redirige es la que debe
		expect(res.render).toHaveBeenCalledWith(views.index, expect.anything());
		
		const objetoCapturado = res.render.mock.calls[0][1].films;

		expect(objetoCapturado).toHaveLength(0);
	});

});