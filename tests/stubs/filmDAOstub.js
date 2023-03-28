class FilmDAO {

	constructor(peliculas){
		this.lista = peliculas;
	}
		
	async listFilms(keyWord){
		return this.lista.filter(p => p.nombre.includes(keyWord));
	}

	async getFilmById(id){
		return this.lista.filter(p => p.id == id);
	}
	
	async getFilmCommentaries(film) {
		return this.lista.filter(observation => observation.pelicula == film);
	}

	async listFilmsByTitle(title){
		return this.lista.filter(p => p.nombre.includes(title));
	}
	
	async averageRate(id) {
		return this.lista.filter(p => p.id == id);
	}

	async getUserRate(usuario, pelicula) {
		return this.lista.filter(comentario => comentario.mail == usuario && comentario.id == pelicula);
	}

	async updateScore(){}
}

module.exports = FilmDAO;