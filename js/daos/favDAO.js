const BaseDAO = require('./baseDAO');
const qFav = require('./queries/favQueries');

class FavDAO extends BaseDAO{

    async getFav(usuario, pelicula) {
        
        return this.query(qFav.isFav, [usuario, pelicula]);
    }

	async addFavByUser(usuario, pelicula) {
        
        return this.query(qFav.createFavFilm, [usuario, pelicula]);
    }

    async deleteFavByUser(user, film) {
        return this.query(qFav.deleteFavFilm, [user, film]);
    }
    
    async listFavByUser(usuario) {
        
     return this.query(qFav.listFavoriteFilms, [usuario]);
    }
    
}

module.exports = FavDAO;