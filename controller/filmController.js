"use strict";

const views = require("../js/configView");


class filmController {

	constructor (dao){
		this.filmDAO = dao;
	}

	postListByKeyWord = async (request, response) => {
		console.log("CONTRROLLER!!!");
		await this.filmDAO.listFilms(request.body.nombreBuscar)
		.then(filmListByKeyWord => {
				response.render(views.index, {
					title: "Mostrando resultados",
					films: filmListByKeyWord
				});
			}
		)
		// .catch(error=>{  
		// 	console.log("Error de acceso a la base de datos");
		// 	response.status(500);  }); // No hay catch para que se propague la excepción y llegue al router listActoreByFilm
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

	getlistFilmsStart = async (request, response) =>{
		await this.filmDAO.listFilmsStart()
		.then( filmsStart => {
				
				response.render(views.index, {
					title: "Listado completo",
					films: filmsStart
				});
		})
	};

	getFilmByIdCtrl = async (request, response) =>{
		console.log("ID --> "+request.params.id);
		await this.filmDAO.getFilmById(request.params.id)
		.then(listadopeliculas =>{
			console.log(listadopeliculas);
			
				response.render(views.vistaPelicula, {
					title: "Listado completo",
					films: 0
				});
			
			

		})
	};


}

module.exports = filmController;



