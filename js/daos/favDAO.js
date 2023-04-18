const BaseDAO = require('./baseDAO');
const qFav = require('./queries/favQueries');

class FavDAO extends BaseDAO{

	async addFavByUser(usuario, pelicula) {
        // let aux =  
        // console.log("resultado insert");
        // console.log(aux.length);
        return this.query(qFav.createFavFilm, [usuario, pelicula]);;
    }

    // async getFav(usuario, pelicula) {
    //     return this.query(qFav.isFav, [usuario, pelicula]);
    // }

    
}

module.exports = FavDAO;