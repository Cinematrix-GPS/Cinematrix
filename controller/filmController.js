"use strict";

const views = require("../js/configView");


class filmController {

	constructor (dao){
		this.filmDAO = dao;
	}

	postListByKeyWord = async (request, response) => {
		
		await this.filmDAO.listFilms(request.body.nombreBuscar)
		.then(filmList => {
				response.render(views.index, {
					title: "Mostrando resultados",
					films: filmList
				});
			}
		); // No hay catch para que se propague la excepción y llegue al router listActoreByFilm
	};
		
	
	postlistActoreByFilm = async (request, response) => {
			await this.filmDAO.listActoreByFilm(request.body.nombreBuscar)
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



