module.exports = {
	
	createComment: `INSERT INTO comentarios(id, id_usuario, id_pelicula, texto, fecha)
	VALUES(?, ?, ?, ?, ?)`,

	getCommentaries: `SELECT c.id, c.id_usuario, c.id_pelicula, c.texto, c.fecha, u.username
	FROM comentarios c 
	LEFT JOIN usuarios u ON c.id_usuario=u.id
	WHERE id_pelicula= ?
	ORDER BY fecha DESC`,
	
	getComentariesByUsuario:`SELECT c.id, c.id_usuario, c.id_pelicula, c.texto, c.fecha, u.username
	FROM comentarios c 
	LEFT JOIN usuarios u ON c.id_usuario=u.id
	WHERE id_pelicula= ? and c.id_usuario= ?
	ORDER BY fecha DESC`
}