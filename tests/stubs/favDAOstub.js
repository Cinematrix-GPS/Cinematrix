class FavDAOStub {

	#favoritos = []

	constructor(){
		if (typeof FavDAOStub.instance === 'object')
			return FavDAOStub.instance;
		
		FavDAOStub.instance = this;
	}
	
	/**
	 * La función recibe un array con favoritos. Para futuros tests: Si hace falta incluir otros objetos en la función
	 * hazlo. Por favor no intentes hacer todo a través de un objeto si luego va a hacer todo más sucio.
	 * @param {[{filmID, userID}]} data 
	 */
	setDAOData(data){
		this.#favoritos = data;
	}

	async listFavByUser(usuario, pelicula) {
        return this.#favoritos.filter(comentario => comentario.mail == usuario && comentario.id == pelicula);
    }

	// Son DAOs de mentira, no tienen que hacer cambios de verdad, sólo queremos los daos
	// para ver que los controllers procesan las cosas como queremos
    async addFav(usuario, pelicula){}
    
	async getFav(usuario, pelicula){
		
	}
}

module.exports = FavDAOStub;