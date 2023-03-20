class FilmDAO {

	constructor(array) {
		this.lista = array;
	}
	
	async listFilms(keyWord) {
		return this.lista.filter(p => p.nombre.includes(keyWord));
	}

	async comments(comment) {
		return this.lista.filter(observation => observation.comment.includes(comment));
	}

}

module.exports = FilmDAO;