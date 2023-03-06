'use strict';

const BaseDAO = require('./');

class FilmDAO extends BaseDAO {
	
	async listFilms(keyWord){

        const formattedKeyWord = `%${keyWord}%`; // Para rodear los '?' de '%?%'
        const q = `
            SELECT DISTINCT p.nombre, p.img, p.duracion, p.puntuacion, p.fechaEstreno, p.sinopsis
            FROM peliculas p
				LEFT JOIN actores_peliculas ap ON p.id=ap.id_pelicula
				LEFT JOIN actores a ON ap.id_actor=a.id
            WHERE p.nombre like ?
            OR p.sinopsis like ?
            OR a.nombre like ?
            OR a.apellidos like ?
			OR p.genero like ?
        `;

        return this.query(q, Array(5).fill(formattedKeyWord));   
    }
}

module.exports = FilmDAO;