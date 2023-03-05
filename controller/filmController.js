"use strict";

const {getPool} = require('../database');


const FilmDAO = require('../js/daos/filmDAO');
const filmDAO = new FilmDAO(getPool());


const views = require("../js/viewConfig");

exports.postListByKeyWord = async (request, response) => {
	await filmDAO.listFilms(request.body.nombreBuscar).then( filmList => {
			response.render(views.index, {
				title: "Mostrando resultados",
				films: filmList
			});
		}
	); // No hay catch para que se propague la excepción y llegue al router
};

