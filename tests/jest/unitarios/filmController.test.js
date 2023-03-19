const FilmDAO = require('../../stubs/filmDAOstub');
const Request = require('../../stubs/requestStub');
const Response = require('../../stubs/responseStub');

const FilmController = require('../../../controller/filmController');

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
		expect(res.render).toHaveBeenCalledWith(expect.anything(), expect.objectContaining({
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
		expect(res.render).toHaveBeenCalledWith(expect.anything(), expect.objectContaining({
			films: expect.arrayContaining([ ])
		}));
	});
});

describe('Tests Controlador Películas: Buscar por Título', () => {
	const dao = new FilmDAO(peliculas);
	const filmController = new FilmController(dao);

	test('Búsqueda por título cuando la película existe', async () => {
		const req = new Request();
		const res = new Response();

		req.body.nombreBuscar = "Shrek";

		await filmController.getlistFilmsByTitle(req, res);

		// Esperamos que el controlador haya llamado a la función render con la vista que esperamos y
		// los datos que esperamos

		expect(res.render).toHaveBeenCalledWith('indexTitle', expect.anything());

		// Obtenemos el objeto con el que se ha llamado a la función render
		const objetoCapturado = res.render.mock.calls[0][1].films; // Primera llamada, segundo parámetro

		expect(objetoCapturado).toContain(peliculas[3]);
	});
	
	test('Búsqueda por título cuando la película NO existe', async () => {
		const req = new Request();
		const res = new Response();

		// Nombre de una película que no existe
		req.body.nombreBuscar = "Película que no existe";

		await filmController.getlistFilmsByTitle(req, res);
		
		// Nos fijamos en que la vista a la que redirige es la que debe
		expect(res.render).toHaveBeenCalledWith('indexTitle', expect.anything());
		
		const objetoCapturado = res.render.mock.calls[0][1].films;

		expect(objetoCapturado).toHaveLength(0);
		
	});
});