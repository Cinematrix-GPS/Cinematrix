"use strict";

const views = require("../js/configView");
const { GetComentaries } = require("../js/daos/querysComment");


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
	GetComentaries = async (request, response) =>{
		console.log("ID --> "+request.params.id);
		await this.filmDAO.GetComentaries(request.params.id)
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



