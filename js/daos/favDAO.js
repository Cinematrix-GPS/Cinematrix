const BaseDAO = require('./baseDAO');
const qFav = require('./queries/favQueries');

class FavDAO extends BaseDAO{

	async listFavByUser(usuario) {
        
        return this.query(qFav.listFavoriteFilms, [usuario]);
    }

}

module.exports = FavDAO;