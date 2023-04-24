const BaseDAO = require('./baseDAO');

const qComment = require('./queries/commentQueries');

class CommentDAO extends BaseDAO {

	async createComment(id, id_usuario, id_pelicula, texto, fecha) {
        return this.query(qComment.createComment, [id, id_usuario, id_pelicula, texto, fecha]);
    }

	async getFilmCommentaries(idFilm) {
        return this.query(qComment.getCommentaries, [idFilm]);
    }

    async getFilmCommentaries2(idFilm,idUser){
        return this.query(qComment.getComentariesByUsuario,[idFilm, idUser]);
    }
}

module.exports = CommentDAO;