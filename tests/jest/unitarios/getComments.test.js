const FilmDAO = require('../../stubs/filmDAOstub');
const Request = require('../../stubs/requestStub');
const Response = require('../../stubs/responseStub');

const FilmController = require('../../../controller/filmController');
const views = require('../../../js/configView');


const comentarios = [
	{	id: 1,
		usuario: 2,
		pelicula: 1,
		texto: 'Muy buena película',
		fecha: '10-10-1000'	},
	{ 	id: 2,
		usuario: 2,
		pelicula: 1,
		texto: 'Sobrecogedora',
		fecha: '10-10-1000'	},
	{	id: 3,
		usuario: 1,
		pelicula: 2,
		texto: 'Impactante',
		fecha: '10-10-1000'	}
];

describe('Test ver comentarios', () => {

	const dao = new FilmDAO(comentarios);
	const filmController = new FilmController(dao);
	
	test('Ver comentarios cuando el comentario existe', async () => {
		const req = new Request();
		const res = new Response();

		req.params.id = 1;

		await filmController.getCommentaries(req, res);

		// Esperamos que se haya llamado a la función res.render y que se le haya pasado por parámetro lo siguiente
		expect(res.render).toHaveBeenCalledWith(expect.anything(), expect.objectContaining(comentarios[0] && comentarios[1]));
	});

	test('Ver comentarios cuando el comentario no existe', async () => {
		
		const req = new Request();
		const res = new Response();

		req.params.id = 3;
		try {
			await filmController.getCommentaries(req, res);
		} catch (exception) {
			expect(exception.message).toBe("No hay comentarios para esta película");
		}
	});

});