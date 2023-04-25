class CommentDAO {

	#comentarios = [];

	constructor(){
		if (typeof CommentDAO.instance === 'object')
			return CommentDAO.instance;
		
		CommentDAO.instance = this;
	}

	/**
	 * La función recibe un array con comentarios. Para futuros tests: Si hace falta incluir otros objetos en la función
	 * hazlo. Por favor no intentes hacer todo a través de un objeto si luego va a hacer todo más sucio.
	 * @param {[{id, pelicula, usuario, texto, fecha}]} data 
	 */
	setDAOData(data){
		this.#comentarios = data;
	}

	async getFilmCommentaries(idFilm) {
		return this.#comentarios.filter(c => c.pelicula == idFilm);
    }
}

module.exports = CommentDAO;