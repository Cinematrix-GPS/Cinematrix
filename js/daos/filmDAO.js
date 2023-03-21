'use strict';

const BaseDAO = require('./baseDAO');
const qFilms = require('./querysFilm');

class FilmDAO extends BaseDAO {
	
	async listFilms(keyWord){

        const formattedKeyWord = `%${keyWord}%`; // Para rodear los '?' de '%?%'
        return this.query(qFilms.listFilm, Array(5).fill(formattedKeyWord));   
    }

	async createFilm(nombre, imagen, duracion, puntuacion, fechaEstreno, sinopsis, genero){
		return this.query(qFilms.createFilm, [nombre, imagen, duracion, puntuacion, fechaEstreno, sinopsis, genero]);
	}

    async listFilmsStart(){
        return this.query(qFilms.qlistFilmStar);
    }

    async listFilmsByTitle(title){
        return this.query(qFilms.qlistFilmByTitle, [title]);
    }

    async getFilmById(id){
        return this.query(qFilms.qGetFilmById, [id]);
    }

    async getFilmCommentaries(id){
        return this.query(qFilms.getCommentaries, [id]);
    }

    // async getActorsById(id){
    //     return this.query(qFilms.qGetFilmById, [id]);
    // }
}

module.exports = FilmDAO;