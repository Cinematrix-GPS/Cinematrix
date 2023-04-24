'use strict'

module.exports ={
                    
    isFav : `SELECT count(id_pelicula) favFilm FROM favoritos 
            WHERE id_usuario=? AND id_pelicula=?`,
   
    createFavFilm : `INSERT INTO favoritos VALUES (?, ?);`,

    deleteFavFilm : `DELETE FROM favoritos WHERE id_usuario = ? AND id_pelicula = ?`
    
};