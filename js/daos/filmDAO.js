'use strict';

const BaseDAO = require('./baseDAO');
const { qlistFilmByTitle } = require('./querysFilm');
const qFilms = require('./querysFilm');

class FilmDAO extends BaseDAO {
	
	async listFilms(keyWord){

        const formattedKeyWord = `%${keyWord}%`; // Para rodear los '?' de '%?%'
        return this.query(qFilms.listFilm, Array(5).fill(formattedKeyWord));   
    }

    async listActoreByFilm(keyWord){
        const formattedKeyWord = `%${keyWord}%`; // Para rodear los '?' de '%?%'
         return this.query(qFilms.listActorByFilm, Array(1).fill(formattedKeyWord));   
    }

	async createFilm(nombre, imagen, duracion, puntuacion, fechaEstreno, sinopsis, genero){
		return this.query(qFilms.createFilm, [nombre, imagen, duracion, puntuacion, fechaEstreno, sinopsis, genero]);
	}

    async listFilmsStart(){
        return this.query(qFilms.qlistFilmStar);
    }

    async listFilmsByTitle(){
        return this.query(qFilms.qlistFilmByTitle);
    }

}

module.exports = FilmDAO;