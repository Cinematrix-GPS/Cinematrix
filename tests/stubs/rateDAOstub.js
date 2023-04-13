class RateDAO {

	#puntuaciones;

	/**
	 * El constructor recibe un array con puntuaciones. Para futuros tests: Si hace falta incluir otros objetos en el constructor
	 * hazlo. Por favor no intentes hacer todo a través de un objeto si luego va a hacer todo más sucio.
	 * @param {[{mail, id, punctuation}]} puntuaciones 
	 */
	constructor(puntuaciones){
		this.#puntuaciones = puntuaciones;
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

module.exports = RateDAO;