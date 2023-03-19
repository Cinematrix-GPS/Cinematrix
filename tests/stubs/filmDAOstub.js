class FilmDAO {

	constructor(peliculas){
		this.lista = peliculas
	}
	
	async listFilms(keyWord){
		return this.lista.filter(p => p.nombre.includes(keyWord));
	}

	async listFilmsByTitle(title){
		return this.lista.filter(p => p.nombre.includes(title));
	}
}

module.exports = FilmDAO;