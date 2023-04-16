class RateDAOStub {

	#puntuaciones = []

	constructor(){
		if (typeof RateDAOStub.instance === 'object')
			return RateDAOStub.instance;
		
		RateDAOStub.instance = this;
	}
	
	/**
	 * La función recibe un array con puntuaciones. Para futuros tests: Si hace falta incluir otros objetos en la función
	 * hazlo. Por favor no intentes hacer todo a través de un objeto si luego va a hacer todo más sucio.
	 * @param {[{mail, id, punctuation}]} data 
	 */
	setDAOData(data){
		this.#puntuaciones = data;
	}

	async getUserRate(usuario, pelicula) {
        return this.#puntuaciones.filter(comentario => comentario.mail == usuario && comentario.id == pelicula);
    }

	// Son DAOs de mentira, no tienen que hacer cambios de verdad, sólo queremos los daos
	// para ver que los controllers procesan las cosas como queremos
    async rate(usuario, pelicula, puntuacion){}
    async updateScore(puntuacion, usuario, pelicula){}

	async averageRate(id) {
		let suma = 0;
        this.#puntuaciones.forEach(p => suma += p.punctuation);
		return [{puntuacion: suma / this.#puntuaciones.length}]
		//return this.#puntuaciones.filter(p => p.id == id);
    }
}

module.exports = RateDAOStub;