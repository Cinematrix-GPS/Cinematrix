'use strict'

module.exports ={
                    
    isFav : `SELECT count(id_pelicula) favFilm FROM favoritos 
            WHERE id_usuario=? AND id_pelicula=?`,
   
    createFavFilm : `INSERT INTO favoritos VALUES (?, ?);`,

    deleteFavFilm : `DELETE FROM favoritos WHERE id_usuario = ? AND id_pelicula = ?`,
    
    listFavoriteFilms : `SELECT p.id, p.nombre, p.img, p.duracion, p.puntuacion, p.fechaEstreno, p.sinopsis
                        FROM peliculas p
                        LEFT JOIN favoritos f
                        ON p.id = f.id_pelicula
                        WHERE f.id_usuario = ?;`
};