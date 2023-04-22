module.exports = {
	getUserRateForFilm:`SELECT puntuacion as valorar
						FROM puntuaciones JOIN usuarios ON puntuaciones.usuario = usuarios.id
						WHERE usuarios.email = ? AND puntuaciones.pelicula = ?`,

	rateFilm:  `INSERT INTO puntuaciones(usuario, pelicula, puntuacion)
				VALUES((SELECT DISTINCT usuarios.id
				FROM usuarios
				WHERE usuarios.email = ?), ?, ?)`,

	updateFilmScore: `UPDATE puntuaciones SET puntuacion = ?
					  WHERE usuario = ? AND pelicula = ?`,

	getAverageRate: `SELECT AVG(puntuacion) puntuacion
					 FROM puntuaciones WHERE pelicula = ?`,


}