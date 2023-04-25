const BaseDAO = require('./baseDAO');
const qRates = require('./queries/rateQueries');

class RateDAO extends BaseDAO{

	async getUserRate(usuario, pelicula) {
        return this.query(qRates.getUserRateForFilm, [usuario, pelicula]);
    }

    async rate(usuario, pelicula, puntuacion) {
        return this.query(qRates.rateFilm, [usuario, pelicula, puntuacion]);
    }

    async updateScore(puntuacion, usuario, pelicula) {
        return this.query(qRates.updateFilmScore, [puntuacion, usuario, pelicula]);
    }

	async averageRate(id) {
        return await this.query(qRates.getAverageRate, [id]);
    }
}

module.exports = RateDAO;