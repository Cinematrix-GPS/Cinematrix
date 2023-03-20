class FilmDAO {

	constructor(array) {
		this.lista = array;
	}
	
	async listFilms(keyWord) {
		return this.lista.filter(p => p.nombre.includes(keyWord));
	}

	async getFilmCommentaries(comment) {
		return this.lista.filter(observation => observation.id == comment);
	}

}

module.exports = FilmDAO;