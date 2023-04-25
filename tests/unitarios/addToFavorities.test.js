process.env.NODE_ENV = 'testing';
const Request = require('../stubs/requestStub');
const Response = require('../stubs/responseStub');

const FilmController = require('../../controller/filmController');
const views = require('../../js/configView');

const DAOFactory = require('../../js/daos/DAOFactory');

const una_pelicula=[{id:1,nombre:'Aquaman'}];

const listFavoritos=[{
    id_usuario:1,
    id_pelicula:1
}
];

const un_usuario=[{id:1,mail:'pedro@xyz.es'}];

describe("Test añadir Favoritos",()=>{
    const factoria = new DAOFactory();
    factoria.getFilmDAO().setDAOData(una_pelicula);
    factoria.getUserDAO().setDAOData(un_usuario);
    factoria.getFavDAO().setDAOData(listFavoritos);
    
    const filmController = new FilmController();

    test('poder añadir un id de usuario y de pelicula inexistente',async()=>{
		const req = new Request();
		const res = new Response();

        req.session.idUser=1;
        req.params.idFilm=1;
        req.params.fav=0;
        //req.mail=una_pelicula[0].mail;

        await filmController.favByUser(req,res);
        
        expect(res.redirect).toHaveBeenCalledWith(expect.stringContaining('/films/getFilmById/1'));
       
    }
    );
}
);