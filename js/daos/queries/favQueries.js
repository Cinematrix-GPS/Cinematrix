'use strict'

module.exports ={
   
    createFavFilm : `INSERT INTO favoritos 
                    (id_usuario, id_pelicula) VALUES (?, ?);`,
    
    isFav : `SELECT count(*) as existe FROM favoritos 
            WHERE id_usuario=? AND id_pelicula=?`
};