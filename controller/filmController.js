"use strict";

const {getPool} = require('../database/configDB');


const FilmDAO = require('../js/daos/filmDAO');
const fDAO = new FilmDAO(getPool());


const views = require("../js/configView");


class filmController {

	postListByKeyWord = async (request, response) => {
		
		await fDAO.listFilms(request.body.nombreBuscar)
		.then( filmList => {
				response.render(views.index, {
					title: "Mostrando resultados",
					films: filmList
				});
			}
		); // No hay catch para que se propague la excepción y llegue al router listActoreByFilm
	};
		
	
	postlistActoreByFilm = async (request, response) => {
			await fDAO.listActoreByFilm(request.body.nombreBuscar)
			.then( actorListByFilm => {
					response.render(views.actor, {
						title: "Mostrando resultados Actores",
						films: actorListByFilm
					});
				}
			)
			.catch(error =>{  response.status(500);  });
	};


}

module.exports = filmController;



