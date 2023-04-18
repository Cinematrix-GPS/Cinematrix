process.env.NODE_ENV = 'testing';

const Request = require('../stubs/requestStub');
const Response = require('../stubs/responseStub');

const FilmController = require('../../controller/filmController');

const DAOFactory = require('../../js/daos/DAOFactory');

const views = require('../../js/configView');

const puntuacion = [{
	mail: "alvarod@gmail.com",
	id: 1,
    punctuation: 9
}, {
    mail: "alalexmanu@gmail.com",
	id: 1,
    punctuation: 7
}, {
    mail: "javiermoya@hotmail.com",
	id: 2,
    punctuation: 8
}];

const usuarios = [
	{
		id: 1,
		mail: 'alvarod@gmail.com',
	},
	{
		id: 2,
		mail: 'alalexmanu@gmail.com',
	},
	{
		id: 3,
		mail: 'javiermoya@hotmail.com',
	}
];

describe('Test Controlador Puntuacion: Puntuacion de una pelicula', () => {

	const factoria = new DAOFactory();
	
	factoria.getFilmDAO().setDAOData(puntuacion);
	factoria.getUserDAO().setDAOData(usuarios);
	factoria.getRateDAO().setDAOData(puntuacion);
	

	const filmController = new FilmController();

	test('Puntuacion de una pelicula', async () => {
		const req = new Request();
		const res = new Response();

		req.session.mail = "alvarod@gmail.com";
		req.params.id = 1;

		await filmController.getUserRateForFilm(req, res);

		// Debe registrarse la puntuación y redirigir la vista
		expect(res.redirect).toHaveBeenCalledWith(`/films/getFilmById/1`);
		
	});

});