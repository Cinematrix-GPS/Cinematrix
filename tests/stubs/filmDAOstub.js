class FilmDAO {

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


}

module.exports = FilmDAO;