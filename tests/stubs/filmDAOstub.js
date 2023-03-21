class FilmDAO {

	constructor(array) {
		this.lista = array;
	}
	
	async listFilms(keyWord) {
		return this.lista.filter(p => p.nombre.includes(keyWord));
	}

	async getFilmCommentaries(film) {
		return this.lista.filter(observation => observation.pelicula == film);
	}

}

module.exports = FilmDAO;