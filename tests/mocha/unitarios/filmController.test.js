var assert = require('assert');

const FilmDAO = require('../../stubs/filmDAOstub');

const FilmController = require('../../../controller/filmController');
const sinon = require("sinon");

const views = require("../../../js/configView");

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

const dao = new FilmDAO(peliculas);
const filmController = new FilmController(dao);

const req = {
    body: {},
    query: {},
    params: {}
};

const res = {
    send: sinon.spy(),
    json: sinon.spy(),
    render: sinon.spy()
};

describe('Test Controlador Películas', () => {
    it('Probando el retorno de la funcion ´postListByKeyWord´', async function(){
        req.body.nombreBuscar = "Alien";

		await filmController.postListByKeyWord(req, res);
        
        sinon.assert.calledWithMatch(res.render, views.index , {
            title: 'Mostrando resultados',
            films: [
                peliculas[0]
            ]
        })
    });

    it('Búsqueda de películas por keyWord cuando la peli NO existe', async () => {
		req.body.nombreBuscar = "peli que no existe";

        await filmController.postListByKeyWord(req, res);

        sinon.assert.calledWithMatch(res.render, views.index , {
            title: 'Mostrando resultados',
            films: [ ]
        });
        
	});
});