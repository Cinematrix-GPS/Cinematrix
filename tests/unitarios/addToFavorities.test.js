process.env.NODE_ENV = 'testing';
const Request = require('../stubs/requestStub');
const Response = require('../stubs/responseStub');

const FilmController = require('../../controller/filmController');
const views = require('../../js/configView');

const DAOFactory = require('../../js/daos/DAOFactory');

const listFavoritos=[{
    id_usuario:1,
    id_pelicula:1
}
];

describe("Test añadir Favoritos",()=>{
    const factoria = new DAOFactory();

    factoria.getfavDAO().setDAOData(listFavoritos);

    const filmController = new FilmController();

    test('poder añadir un id de usuario y de pelicula existente',async()=>{
		const req = new Request();
		const res = new Response();

        req.session.id_usuario=1;
        req.params.id_pelicula=1;
        req.params.fav=0;

        await filmController.favByUser(req,res);
        expect(res.redirect).toHaveBeenCalledWith(`/films/getFilmById/undefined`);
    }
    );






}
);