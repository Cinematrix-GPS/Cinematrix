process.env.NODE_ENV = 'testing';

const Request = require('../stubs/requestStub');
const Response = require('../stubs/responseStub');

// Puede ser el filmController o el favController, no sé
const FilmController = require('../../controller/filmController');

const views = require('../../js/configView');
const DAOFactory = require('../../js/daos/DAOFactory');

peliculas = [{id: 1, nombre: 'Shrek 2'}, {id: 2, nombre: 'Peli random'}, {id: 3, nombre: 'Super Mario Bros'}];

favoritos = [{userID: 1, filmID: 1}, {userID: 1, filmID: 3}];

usuarios = [{id: 1, mail: 'angel@gps.es'}, {id: 2, mail: 'manolo@manolo.manolo'}, {id: 3, mail: 'carlos@gps.es'}];

describe('Tests unitarios de mostrar favoritos.', () =>{
	const factoria = new DAOFactory();

	factoria.getFilmDAO().setDAOData(peliculas);
	factoria.getFavDAO().setDAOData(favoritos, peliculas);
	factoria.getUserDAO().setDAOData(usuarios);

	test('Lista de favoritos de un usuario que tiene 2 películas en su lista de favoritas.', async () => {
		const req = new Request();
		const res = new Response();

		req.session.idUser = 1;

		filmController = new FilmController();
		
		await filmController.listFavByUser(req, res);

		const captura = res.render.mock.calls[0][1].films;

		// Comprobamos que se carga la vista de favoritos con el objeto que debe
		expect(res.render).toHaveBeenCalledWith(views.mostrarListaFavoritos, expect.anything());		

		expect(captura).toContainEqual(peliculas[0]);
		expect(captura).toContainEqual(peliculas[2]);
	});

	test('Lista de favoritos de un usuario que no tiene películas en su lista de favoritas.', async () => {
		const req = new Request();
		const res = new Response();

		req.session.idUser = 2;

		filmController = new FilmController();
		
		await filmController.listFavByUser(req, res);
		const captura = res.render.mock.calls[0][1].films;

		// Comprobamos que se carga la vista de favoritos con el objeto vacío
		expect(res.render).toHaveBeenCalledWith(views.mostrarListaFavoritos, expect.anything());		

		expect(captura).toHaveLength(0);
	});
});