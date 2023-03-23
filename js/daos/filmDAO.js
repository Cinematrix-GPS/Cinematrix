'use strict';

const BaseDAO = require('./baseDAO');
const qFilms = require('./querysFilm');

class FilmDAO extends BaseDAO {
	
	async listFilms(keyWord) {
        const formattedKeyWord = `%${keyWord}%`;
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
        return this.query(qFilms.qGetFilmById, [id]);
    }

    async getFilmCommentaries(id) {
        return this.query(qFilms.getCommentaries, [id]);
    }

    async createUser(id, nombreCompleto, username, email, password) {
        return this.query(qFilms.createUser, [id, nombreCompleto, username, email, password]);
    }

    async createComment(id, id_usuario, id_pelicula, texto, fecha) {
        return this.query(qFilms.createComment, [id, id_usuario, id_pelicula, texto, fecha]);
    }

    async getUserRate(usuario, pelicula) {
        return this.query(qFilms.getUserRateForFilm, [usuario, pelicula]);
    }

    async rate(usuario, pelicula, puntuacion) {
        return this.query(qFilms.rateFilm, [usuario, pelicula, puntuacion]);
    }

    async updateScore(usuario, pelicula, puntuacion) {
        return this.query(qFilms.getUserRateForFilm, [usuario, pelicula, puntuacion]);
    }
    
}

module.exports = FilmDAO;