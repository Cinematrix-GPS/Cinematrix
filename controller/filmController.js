"use strict";

const views = require("../js/configView");


class filmController {

	constructor (dao){
		this.filmDAO = dao;
	}

	postListByKeyWord = async (request, response) => {
		console.log("CONTRROLLER!!!");
		if(request){
			console.log("Buscar keyword");
			console.log(request.body.);
			await this.filmDAO.listFilms(request.body.nombreBuscar)
			.then(filmListByKeyWord => {
					response.render(views.index, {
						title: "Mostrando resultados",
						films: filmListByKeyWord
					});
				}
			)
		}
		else if(request.body.titulo){
			console.log("Buscar Titulo");
			console.log(request.body.titulo);
			await this.filmDAO.listFilmsByTitle(request.body.titulo)
			.then( filmListByTitle => {
					response.render(views.index,{
						title: "Listar peliculas por titulo",
						films: filmListByTitle
					});
				}
			)
		}

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
			//Sale con los datos de los actores
			// console.log(listadopeliculas);
			// Filtrando json con los actores
			let pelicula = listadopeliculas.map(p =>{
				return {id: p.id, nombre: p.nombre,	img: p.img,	duracion: p.duracion, puntuacion: p.puntuacion,	fechaEstreno: p.fechaEstreno,
					sinopsis: p.sinopsis, genero: p.genero}
			}).slice(0, 1);
			
			console.log(pelicula);
			let actores =listadopeliculas.map(  a =>{
				return {nombreAct: a.nombreAct, apellidosAct: a.apellidosAct}
			});
			console.log(actores);
			
				// response.render(views.vistaPelicula, {
				// 	title: "Listado completo",
				// 	film: ,
				// 	actores: 
				// });
			
			

		})
	};


}

module.exports = filmController;



