const BaseDAO = require('./');

class FilmDAO extends BaseDAO {
	
	async listFilms(keyWord){

        const formattedKeyWord = `%${keyWord}%`; // Para rodear los '?' de '%?%'
        const q = `
            SELECT DISTINCT p.nombre, p.img, p.duracion, p.puntuacion, p.fechaEstreno, p.sinopsis
            FROM peliculas p
            JOIN actores_peliculas ap
            ON p.id=ap.id_pelicula
            JOIN actores a
            ON ap.id_actor=a.id
            WHERE p.nombre like ?
            OR p.sinopsis like ?
            OR a.nombre like ?
            OR a.apellidos like ?
        `

        return this.query(q, [formattedKeyWord, formattedKeyWord, formattedKeyWord, formattedKeyWord])   
    }
}

module.exports = FilmDAO;