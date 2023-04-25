class FavDAOStub {

	#favoritos = []
	#peliculas = []

	constructor(){
		if (typeof FavDAOStub.instance === 'object')
			return FavDAOStub.instance;
		
		FavDAOStub.instance = this;
	}
	
	/**
	 * La función recibe un array con favoritos. Para futuros tests: Si hace falta incluir otros objetos en la función
	 * hazlo. Por favor no intentes hacer todo a través de un objeto si luego va a hacer todo más sucio.
	 * @param {[[{filmID, userID}], [{id, nombre}]]} data 
	 */
	setDAOData(...data){
		this.#favoritos = data[0];
		this.#peliculas = data[1];
	}

	async listFavByUser(idUsuario) {
        const pelisFavoritas = [];

		this.#favoritos.filter(fav => fav.userID == idUsuario)
						.forEach(fav => pelisFavoritas.push({
							id: fav.filmID,
							nombre: this.#peliculas.find(film => fav.filmID == film.id).nombre
						}));

		return pelisFavoritas;
    }


	// Son DAOs de mentira, no tienen que hacer cambios de verdad, sólo queremos los daos
	// para ver que los controllers procesan las cosas como queremos
    async addFav(usuario, pelicula){}
    
	async getFav(usuario, pelicula){
		
	}

	async addFavByUser(user,peli){
        return this.#favoritos.filter(f => f.userID == user && f.filmID == peli);
    }
}

module.exports = FavDAOStub;