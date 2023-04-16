class FilmDAOStub {

	#peliculas= [];

	constructor(){
		if (typeof FilmDAOStub.instance === 'object')
			return FilmDAOStub.instance;

		FilmDAOStub.instance = this;
	}
	
	setDAOData(data){
		this.#peliculas = data;
	}

	async listFilms(keyWord){
		return this.#peliculas.filter(p => p.nombre.includes(keyWord));
	}

	async getFilmById(id){
		return this.#peliculas.filter(p => p.id == id);
	}
	
	async listFilmsByTitle(title){
		return this.#peliculas.filter(p => p.nombre.includes(title));
	}
}

module.exports = FilmDAOStub;