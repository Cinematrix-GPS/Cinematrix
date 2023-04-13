class CommentDAO {

	/**
	 * El constructor recibe un array con comentarios. Para futuros tests: Si hace falta incluir otros objetos en el constructor
	 * hazlo. Por favor no intentes hacer todo a través de un objeto si luego va a hacer todo más sucio.
	 * @param {[{id, pelicula, usuario, texto, fecha}]} comentarios 
	 */
	constructor(comentarios){
		this.comentarios = comentarios;
	}

	async getFilmCommentaries(idFilm) {
		return this.comentarios.filter(c => c.pelicula == idFilm);
    }
}

module.exports = CommentDAO;