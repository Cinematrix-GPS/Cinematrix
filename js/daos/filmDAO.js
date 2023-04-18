'use strict';

const BaseDAO = require('./baseDAO');
const qFilms = require('./queries/filmQueries');

class FilmDAO extends BaseDAO {
	
	async listFilms(keyWord) {

        // let formattedKeyWord ="";
        // if (typeof keyWord === 'number') formattedKeyWord = keyWord;
        // else 
        let formattedKeyWord = `%${keyWord}%`;
        
        return this.query(qFilms.listFilm, Array(5).fill(formattedKeyWord));   
    }

	async createFilm(nombre, imagen, duracion, puntuacion, fechaEstreno, sinopsis, genero) {
		return this.query(qFilms.createFilm, [nombre, imagen, duracion, puntuacion, fechaEstreno, sinopsis, genero]);
	}

    async listFilmsStart() {
        return this.query(qFilms.qlistFilmStar);
    }

    async listFilmsByTitle(title) {
        const formattedKeyWord = `%${title}%`;
        return this.query(qFilms.qlistFilmByTitle, [formattedKeyWord]);
    }

    async getFilmById(id) {
        return await this.query(qFilms.qGetFilmById, [id]);
    }

    async createUser(id, nombreCompleto, username, email, password) {
        return this.query(qFilms.createUser, [id, nombreCompleto, username, email, password]);
    }    
}

module.exports = FilmDAO;