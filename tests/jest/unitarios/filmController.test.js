const FilmDAO = require('../../stubs/filmDAOstub');

const FilmController = require('../../../controller/filmController');

const peliculas = [{
	nombre: "Alien",
	img: 1
}, {
	nombre: "Terminator",
	img: 1
}, {
	nombre: "Shrek",
	img: 1
}];

const comentarios = [
	{	id: 1,
		usuario: 2,
		pelicula: 2,
		texto: "Muy buena película",
		fecha: "10-10-1000"	},
	{ 	id: 2,
		usuario: 2,
		pelicula: 3,
		texto: "Sobrecogedora",
		fecha: "10-10-1000"	},
	{	id: 3,
		usuario: 1,
		pelicula: 1,
		texto: "Impactante",
		fecha: "10-10-1000"	}
];

describe('Test palabra clave', () => {
	const dao = new FilmDAO(peliculas);
	const filmController = new FilmController(dao);

	const req = {
		body: {},
		query: {},
		params: {}
	};

	const res = {
		send: jest.fn(),
		json: jest.fn(),
		render: jest.fn()
	};

	test('Búsqueda de películas por keyWord cuando la peli existe', async () => {
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
		req.body.nombreBuscar = "peli que no existe";

		await filmController.postListByKeyWord(req, res);

		// Esperamos que se llame a request.render con un objeto que tenga un array vacío de films
		expect(res.render).toHaveBeenCalledWith(expect.anything(), expect.objectContaining({
			films: expect.arrayContaining([ ])
		}));
	});
});

describe('Test ver comentarios', () => {

	const dao = new FilmDAO(comentarios);
	const filmController = new FilmController(dao);

	const req = {
		body: {},
		query: {},
		params: {}
	};

	const res = {
		send: jest.fn(),
		json: jest.fn(),
		render: jest.fn()
	};

	test('Ver comentarios cuando el comentario existe', async () => {

		req.params.id = 1;

		await filmController.getCommentaries(req, res);

		// Esperamos que se haya llamado a la función res.render y que se le haya pasado por parámetro lo siguiente
		expect(res.render).toHaveBeenCalledWith(expect.anything(), expect.objectContaining(comentarios[0]));
	});

	test('Ver comentarios cuando el comentario no existe', async () => {
		
		req.params.id = 4;

		await filmController.getCommentaries(req, res);

		// Esperamos que se llame a request.render con un objeto que tenga un array vacío de films
		expect(res.render).toHaveBeenCalledWith(expect.anything(), expect.objectContaining([ ]));
	});

});