class FilmDAO {

<<<<<<< HEAD
	constructor(peliculas){
		this.lista = peliculas;
	}
	
	
	async listFilms(keyWord){

		return this.lista.filter(p => p.nombre.includes(keyWord));
	}

	async getFilmById(id){
		console.log("para mirar q sale "+ id+ "...");
		return this.lista.filter(p => p.id=id);
	}


=======
	constructor(array) {
		this.lista = array;
	}
	
	async listFilms(keyWord) {
		return this.lista.filter(p => p.nombre.includes(keyWord));
	}

	async getFilmCommentaries(film) {
		return this.lista.filter(observation => observation.pelicula == film);
	}

>>>>>>> 691ebd6a9d9b8d47f9563104a581dfe0424126b5
}

module.exports = FilmDAO;