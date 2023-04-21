process.env.NODE_ENV = 'testing';

const Request = require('../stubs/requestStub');
const Response = require('../stubs/responseStub');

// Puede ser el filmController o el favController, no sé
const FilmController = require('../../controller/filmController');

const views = require('../../js/configView');
const DAOFactory = require('../../js/daos/DAOFactory');

peliculas = [{id: 1,nombre: 'Shrek 2'}, {id: 2, nombre: 'Peli random'}, {id: 3, nombre: 'Super Mario Bros'}];

favoritos = [{userId: 1, filmId: 1}, {userId: 1, filmId: 3}];

usuarios = [{id: 1, mail: 'angel@gps.es'}, {id: 2, mail: 'manolo@manolo.manolo'}, {id: 3, mail: 'carlos@gps.es'}];

describe('Tests unitarios de mostrar favoritos.', () =>{
	const factoria = new DAOFactory();

	factoria.getFilmDAO().setDAOData(peliculas);
	// factoria.getFavDAO().setDAOData(favoritos);
	factoria.getUserDAO().setDAOData(usuarios);

	test('Lista de favoritos de un usuario que tiene 2 películas en su lista de favoritas.', async () => {
		const req = new Request();
		const res = new Response();

		req.mail = usuarios[1].mail;

		filmController = new FilmController();
		
		
		//await filmController.getFavs(req, res);
		const captura = res.render.mock.calls[0][1].peliculas;

		// Comprobamos que se carga la vista de favoritos con el objeto que debe
		expect(res.render).toHaveBeenCalledWith('vista', expect.anything());		

		expect(captura).toContain(peliculas[0]);
		expect(captura).toContain(peliculas[3]);
	});

	test('Lista de favoritos de un usuario que no tiene películas en su lista de favoritas.', async () => {
		const req = new Request();
		const res = new Response();

		req.mail = usuarios[1].mail;

		filmController = new FilmController();
		
		
		//await filmController.getFavs(req, res);
		const captura = res.render.mock.calls[0][1].peliculas;

		// Comprobamos que se carga la vista de favoritos con el objeto vacío
		expect(res.render).toHaveBeenCalledWith('vista', expect.anything());		

		expect(captura).toHaveLength(0);
	});
});