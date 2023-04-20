'use strict'

module.exports ={
   
    createFavFilm : `INSERT INTO favoritos VALUES (?, ?);`,
    
                    
    isFav : `SELECT count(id_pelicula) favFilm FROM favoritos 
            WHERE id_usuario=? AND id_pelicula=?`
};