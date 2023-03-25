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
						films: filmListByTitle,
						msg: "Busqueda por Título"
					});
				}
			)
		}
		else if (request.body.nombreBuscar) {
			console.log("Buscar keyword");
			console.log(request.body.nombreBuscar);
			await this.filmDAO.listFilms(request.body.nombreBuscar)
			.then(filmListByKeyWord => {
					response.render(views.index, {
						title: "Listar peliculas por palabra clave",
						films: filmListByKeyWord,
						msg: "Busqueda por palabra clave"
					});
				}
			)
		}
		// .catch(error=>{  
		// 	console.log("Error de acceso a la base de datos");
		// 	response.status(500);  }); // No hay catch para que se propague la excepción y llegue al router listActoreByFilm
	};

	getlistFilmsStart = async (request, response) => {
		await this.filmDAO.listFilmsStart()
		.then( filmsStart => {
				
				response.render(views.index, {
					title: "Listado completo",
					films: filmsStart,
					msg: ""
				});
		})
	};

	getFilmByIdCtrl = async (request, response) => {
		console.log("ID --> " + request.params.id);
		await this.filmDAO.getFilmById(request.params.id)
		.then(listadopeliculas =>{
			//Sale con los datos de los actores
			// console.log(listadopeliculas);
			// Filtrando json con los actores
			let pelicula = listadopeliculas.map(p => {
				return {id: p.id, nombre: p.nombre,	duracion: p.duracion, puntuacion: p.puntuacion,	fechaEstreno: p.fechaEstreno,
					sinopsis: p.sinopsis, genero: p.genero}
			}).slice(0, 1);
			
			console.log(pelicula);
			
			let actores =listadopeliculas.map(a => {
				return {nombreAct: a.nombreAct, apellidosAct: a.apellidosAct}
			});
			console.log(actores);
			if (pelicula.length==0){
				response.render(views.vistaPelicula,[])
			}else{
				response.render(views.vistaPelicula, {
				titleV: pelicula[0].nombre,
				idV: pelicula[0].id,
				sinopsisV: pelicula[0].sinopsis,
				generoV: pelicula[0].genero,
				actoresV: actores,
				fechaEstrenoV: pelicula[0].fechaEstreno,
				duracionV: pelicula[0].duracion,

				});
			}
		})
	};
	

	getCommentaries = async (request, response) => {
		console.log("ID película --> " + request.params.id);
		await this.filmDAO.getFilmCommentaries(request.params.id)
		.then(comments =>{
			console.log(comments);
			response.render(views.comentario, {
				comments: comments
			});
		})
	};

	getUserRateForFilm = async (request, response) => {
		await this.filmDAO.getUserRate(request.session.usuario, request.params.id)
		.then(punctuation => {
			if (punctuation == null) rateFilm(request, response);
			else updateFilmScore(request, response);
		})
	};

	rateFilm = async (request, response) => {
		await this.filmDAO.rate(request.session.usuario, request.params.id, request.body.puntuacion);
		response.render({ message: "Se ha registrado su puntuación" });
	};

	updateFilmScore = async (request, response) => {
		await this.filmDAO.updateScore(request.session.body.usuario, request.params.id, request.body.puntuacion);
		response.render({ message: "Se ha actualizado su puntuación" });
	};

}

module.exports = filmController;