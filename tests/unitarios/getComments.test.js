process.env.NODE_ENV = 'testing';

const Request = require('../stubs/requestStub');
const Response = require('../stubs/responseStub');

const FilmController = require('../../controller/filmController');
const views = require('../../js/configView');

const DAOFactory = require('../../js/daos/DAOFactory');

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

const puntuaciones = [{
	id: 1,
	mail: 'angel@gps.es',
	punctuation: 10
}]

describe('Test ver comentarios', () => {

	const factoria = new DAOFactory();

	const commentDAO = factoria.getCommentDAO(); commentDAO.setDAOData(comentarios);
	const rateDAO = factoria.getRateDAO(); rateDAO.setDAOData(puntuaciones);

	const filmController = new FilmController();
	
	test('Ver comentarios cuando el comentario existe', async () => {
		const req = new Request();
		const res = new Response();

		req.params.id = 1;

		await filmController.getFilmByIdCtrl(req, res);
		
		const objetoCapturado = res.render.mock.calls[0][1].comentariosV;

	
		// Esperamos que se haya llamado a la función res.render y que se le haya pasado por parámetro lo siguiente
		expect(objetoCapturado).toContain(comentarios[0]);
		expect(objetoCapturado).toContain(comentarios[1]);
	});

	test('Ver comentarios cuando el comentario no existe', async () => {
		
		const req = new Request();
		const res = new Response();

		req.params.id = -1;

		await filmController.getFilmByIdCtrl(req, res);
		
		const objetoCapturado = res.render.mock.calls[0][1].comentariosV;

		expect(objetoCapturado).toHaveLength(0);
	});

});