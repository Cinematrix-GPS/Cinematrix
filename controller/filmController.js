"use strict";

const views = require("../js/configView");
const DAOFactory = require('../js/daos/DAOFactory');

class filmController {

	#pelicula;
	#actores;
	#comments;

//const filmController = new FilmController(fDAO, uDAO, rDAO, cDAO);
	constructor () {
		const factoria = new DAOFactory();
		this.filmDAO = factoria.getFilmDAO();
		this.userDAO = factoria.getUserDAO();
		this.rateDAO = factoria.getRateDAO();
		this.commentDAO = factoria.getCommentDAO();
	}

	postListByKeyWord = async (request, response) => {
		console.log("CONTRROLLER!!!");
		
		console.log(request.body.titulo);
		console.log(request.body.nombreBuscar);
		if(request.body.titulo){
			console.log("Buscar Titulo");
			console.log(request.body.titulo);
			await this.filmDAO.listFilmsByTitle(request.body.titulo)
			.then( filmListByTitle => {
					response.render(views.index,{
						title: "Listar peliculas por titulo",
						films: filmListByTitle?filmListByTitle:0,
						msg: "Busqueda por Título",
						username: request.session.username?request.session.username:0
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
						films: filmListByKeyWord?filmListByKeyWord:0,
						msg: "Busqueda por palabra clave",
						username: request.session.username?request.session.username:0
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
					films: filmsStart?filmsStart:0,
					msg: "",
					username: request.session.username?request.session.username:0
				});
		})
	};

	getFilmByIdCtrl = async (request, response) => {
		console.log("ID --> " + request.params.id);
		this.#comments = await this.commentDAO.getFilmCommentaries(request.params.id)
		let media = (await this.rateDAO.averageRate(request.params.id))[0].puntuacion;
		if (!media) media = '-';
		else {
			media = Number(media.toFixed(2));
		}
		await this.filmDAO.getFilmById(request.params.id)
		.then(listadopeliculas =>{
			//Sale con los datos de los actores
			// console.log(listadopeliculas);
			// Filtrando json con los actores
			this.#pelicula = listadopeliculas.map(p => {
				return {id: p.id, 
					nombre: p.nombre,
					img: p.img,
					duracion: p.duracion, 
					puntuacion: media,
					fechaEstreno: p.fechaEstreno,
					sinopsis: p.sinopsis, 
					genero: p.genero}
			}).slice(0, 1);
			
			console.log(this.#pelicula);
			
			this.#actores = listadopeliculas.map(a => {
				return {nombreAct: a.nombreAct, apellidosAct: a.apellidosAct}
			});
			console.log(this.#actores);
			
			// response.render(views.vistaPelicula, {
			// 	titleV: pelicula[0].nombre,
			// 	idV: pelicula[0].id,
			// 	sinopsisV: pelicula[0].sinopsis,
			// 	generoV: pelicula[0].genero,
			// 	actoresV: actores,
			// 	fechaEstrenoV: pelicula[0].fechaEstreno,
			// 	duracionV: pelicula[0].duracion

			// });
			response.render(views.vistaPelicula, {
				pelicula: this.#pelicula[0],
				actoresV: this.#actores,
				comentariosV: this.#comments,
				username: request.session.username?request.session.username:0
			});
		})
	};

	getUserRateForFilm = async (request, response) => {
		await this.rateDAO.getUserRate(request.session.mail, request.params.id)
		.then(result => {
			if (result.length == 0) this.rateFilm(request, response);
			else this.updateFilmScore(request, response);
		})
		response.redirect(`/films/getFilmById/${ request.params.id }`);
	};

	rateFilm = async (request, response) => {
		await this.rateDAO.rate(request.session.mail, request.params.id, request.body.punctuation);
	};

	updateFilmScore = async (request, response) => {
		const idUsuario = (await this.userDAO.getUser(request.session.mail)).id;

		await this.rateDAO.updateScore(request.body.punctuation, idUsuario, request.params.id);
	};

	favByUser = async (request, response) => {
		console.log("Controller fav "+req.session.username);
	};

}

	

module.exports = filmController;