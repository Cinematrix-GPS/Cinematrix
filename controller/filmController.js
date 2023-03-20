"use strict";

const views = require("../js/configView");

class filmController {

	constructor (dao) {
		this.filmDAO = dao;
	}

	postListByKeyWord = async (request, response) => {
		console.log("CONTRROLLER!!!");
		
		// console.log(request.body.titulo);
		// console.log(request.body.nombreBuscar);
		if(request.body.titulo){
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
		else if(request.body.nombreBuscar){
			console.log("Buscar keyword");
			console.log(request.body.nombreBuscar);
			await this.filmDAO.listFilms(request.body.nombreBuscar)
			.then(filmListByKeyWord => {
					response.render(views.index, {
						title: "Listar peliculas por palabra clave",
						films: filmListByKeyWord
					});
				}
			)
		}
		// .catch(error=>{  
		// 	console.log("Error de acceso a la base de datos");
		// 	response.status(500);  }); // No hay catch para que se propague la excepción y llegue al router listActoreByFilm
	};
		
	
<<<<<<< HEAD
	
=======
	postlistActoreByFilm = async (request, response) => {
		await this.filmDAO.listActoreByFilm(request.body.nombreBuscar)
		.then( actorListByFilm => {
				response.render(views.actor, {
					title: "Mostrando resultados Actores",
					films: actorListByFilm
				});
			}
		)
		.catch(error =>{ response.status(500); });
	};
>>>>>>> 691ebd6a9d9b8d47f9563104a581dfe0424126b5

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
		console.log("ID --> " + request.params.id);
		await this.filmDAO.getFilmById(request.params.id)
		.then(listadopeliculas =>{
			//Sale con los datos de los actores
			// console.log(listadopeliculas);
			// Filtrando json con los actores
			let pelicula = listadopeliculas.map(p =>{
				return {id: p.id, nombre: p.nombre,	duracion: p.duracion, puntuacion: p.puntuacion,	fechaEstreno: p.fechaEstreno,
					sinopsis: p.sinopsis, genero: p.genero}
			}).slice(0, 1);
			
			console.log(pelicula);
			let actores =listadopeliculas.map(  a =>{
				return {nombreAct: a.nombreAct, apellidosAct: a.apellidosAct}
			});
			console.log(actores);
			
				response.render(views.vistaPelicula, {
				titleV: pelicula[0].nombre,
				idV: pelicula[0].id,
				sinopsisV: pelicula[0].sinopsis,
				generoV: pelicula[0].genero,
				actoresV: actores,
				fechaEstrenoV: pelicula[0].fechaEstreno,
				duracionV: pelicula[0].duracion,

				});
		})
	};
	
	getCommentaries = async (request, response) =>{
		console.log("ID comentario --> " + request.params.id);
		await this.filmDAO.getFilmCommentaries(request.params.id)
		.then(comments =>{
			console.log(comments);
			response.render(views.vistaPelicula, {
				id: comments[0].id,
				usuario: comments[0].usuario,
				pelicula: comments[0].pelicula,
				texto: comments[0].texto,
				fecha: comments[0].fecha
			});
		}).catch(error =>{ throw new TypeError("No hay comentarios para esta película") });
	};

}

module.exports = filmController;