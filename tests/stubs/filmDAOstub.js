class FilmDAO {

	constructor(peliculas){
		this.lista = peliculas;
	}
	
	
	async listFilms(keyWord){
		return this.lista.filter(p => p.nombre.includes(keyWord));
	}

	async basicInfoFilms(id){

		return this.lista.filter(p=>p.id.includes([id]));
	}


}

module.exports = FilmDAO;