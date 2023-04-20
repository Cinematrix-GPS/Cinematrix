"use strict";

const views = require("../js/configView");
const DAOFactory = require('../js/daos/DAOFactory');

class filmController {

	#pelicula;
	#actores;
	#comments;
	#fav;

//const filmController = new FilmController(fDAO, uDAO, rDAO, cDAO);
	constructor () {
		const factoria = new DAOFactory();
		this.filmDAO = factoria.getFilmDAO();
		this.userDAO = factoria.getUserDAO();
		this.rateDAO = factoria.getRateDAO();
		this.commentDAO = factoria.getCommentDAO();
		this.favDAO = factoria.getfavDAO();
	}

	postListByKeyWord = async (request, response) => {
		console.log("CONTRROLLER!!!");
		
		console.log(request.body.busqueda);
		if(request.body.busqueda == 1){
			console.log("Buscar Titulo");
			console.log(request.body.nombreBuscar);
			await this.filmDAO.listFilmsByTitle(request.body.nombreBuscar)
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
		else if (request.body.busqueda == 0) {
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
		console.log("ID pelicula--> " + request.params.id);
		this.#comments = await this.commentDAO.getFilmCommentaries(request.params.id);
		let media = (await this.rateDAO.averageRate(request.params.id))[0].puntuacion;
		if (!media) media = '-';
		else {
			media = Number(media.toFixed(2));
		}
		if (typeof(request.session.idUser) !== "undefined")
			this.#fav = (await this.favDAO.getFav(request.session.idUser, request.params.id))[0].favFilm;
			// 1 Pelicula favorita, 0 No favorita
			// 1 Pelicula favorita, 0 No favorita
		else this.#fav = 0; // por defecto

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
			
			this.#actores = listadopeliculas.map(a => {
				return {nombreAct: a.nombreAct, apellidosAct: a.apellidosAct}
			});
			
			
			response.render(views.vistaPelicula, {
				pelicula: this.#pelicula[0],
				actoresV: this.#actores,
				comentariosV: this.#comments,
				username: request.session.username?request.session.username:0,
				favorite: this.#fav
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
		//NO NECESARIO OBTENER AL INICIAR SESION TENEMOS EL ID CON--> request.session.idUser
		await this.rateDAO.updateScore(request.body.punctuation, idUsuario, request.params.id);
	};

	favByUser = async (request, response) => {
		console.log("Controller fav "+request.params.idFilm + " " + request.params.fav);
		if (request.params.fav == 0){//No es favorita se inserta
			await this.favDAO.addFavByUser(request.session.idUser, request.params.idFilm);
			console.log("No es favorita se inserta");
			this.#fav = 1;
		}
		else if(request.params.fav == 1){//NO IMPLEMENTADO SE HARIA EL BORRADO
			console.log("Favorita se borra");
		}  
		//Pase lo que pase se redirige, estaria bien mostrar un mensaje de retroalimentacion en la vista "Añadida", "Eliminada de favoritos"...
		response.redirect(`/films/getFilmById/${ request.params.idFilm }`);
		
		// response.status(500);
	};

}

module.exports = filmController;