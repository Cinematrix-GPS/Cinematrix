class FilmDAO {

	constructor(peliculas){
		this.lista = peliculas;
	}
	
	
	async listFilms(keyWord){
		return this.lista.filter(p => p.nombre.includes(keyWord));
	}

	async basicInfoFilms(information){
		return this.lista.toString()===information.toString();
	}


}

module.exports = FilmDAO;