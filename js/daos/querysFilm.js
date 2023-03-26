'use strict'
/*
En este archivo vamos a guardar los normbres de las vistas, de esta manera cambiamos de forma global
todas las vistas y nos ahorramos muchos fallos innecesarios
*/

module.exports = {
    listFilm:   `SELECT DISTINCT p.nombre, p.img, p.id, p.puntuacion
                FROM peliculas p
                    LEFT JOIN actores_peliculas ap ON p.id=ap.id_pelicula
                    LEFT JOIN actores a ON ap.id_actor=a.id
                WHERE p.nombre like ?
                OR p.sinopsis like ?
                OR a.nombreAct like ?
                OR a.apellidosAct like ?
                OR p.genero like ?`,
    
	createFilm: `INSERT INTO peliculas(nombre, img, duracion, puntuacion, fechaEstreno, sinopsis, genero)
							    VALUES(?, ?, ?, ?, ?, ?, ?)`,

    qlistFilmStar: `SELECT p.id, p.nombre, p.img, p.puntuacion
                    FROM peliculas p 
                    ORDER BY p.fechaEstreno DESC;`,
    
    qlistFilmByTitle: `SELECT p.id, p.nombre, p.img, p.duracion, p.puntuacion, p.fechaEstreno, p.sinopsis
                        FROM peliculas p
                        WHERE p.nombre like ?`,

    // qGetFilmById: ` SELECT id, nombre, img, duracion, puntuacion, fechaEstreno, sinopsis, genero 
    //                 FROM peliculas
    //                 WHERE id=?`,

    qGetFilmById: `SELECT p.id, p.nombre, p.duracion, p.puntuacion, p.fechaEstreno, p.sinopsis, p.genero, a.nombreAct, a.apellidosAct 
                    FROM peliculas  p
                    LEFT JOIN actores_peliculas ap ON p.id=ap.id_pelicula
                    LEFT JOIN actores a ON ap.id_actor=a.id
                    WHERE p.id=?`,

    // qGetActorsById: `SELECT a.*
    //                 FROM peliculas p
    //                 LEFT JOIN actores_peliculas ap ON p.id=ap.id_pelicula
    //                 LEFT JOIN actores a ON ap.id_actor=a.id
    //                 WHERE p.id=?`

    // conseguir los comentarios
    getCommentaries: `SELECT c.id, c.id_usuario, c.id_pelicula, c.texto, c.fecha, u.username
                        FROM comentarios c 
                        LEFT JOIN usuarios u ON c.id_usuario=u.id
                        WHERE id_pelicula= ?
                        ORDER BY fecha DESC`,

    createUser: `INSERT INTO USUARIOS(id, nombreCompleto, username, email, password)
                 VALUES (?, ?, ?, ?, ?)`,

    createComment: `INSERT INTO COMENTARIOS(id, id_usuario, id_pelicula, texto, fecha)
                    VALUES(?, ?, ?, ?, ?)`,

    getUserRateForFilm: `SELECT puntuacion
                         FROM puntuaciones JOIN usuarios ON puntuaciones.usuario = usuarios.id
                         WHERE usuarios.email = ? AND puntuaciones.pelicula = ?`,

    rateFilm: `INSERT INTO puntuaciones(usuario, pelicula, puntuacion)
               VALUES((SELECT DISTINCT usuarios.id
                       FROM puntuaciones p JOIN usuarios ON p.usuario = usuarios.id
                       WHERE usuarios.email = ?), ?, ?)`,

    updateFilmScore: `UPDATE puntuaciones SET puntuacion = ?
                      WHERE usuario = (SELECT DISTINCT usuarios.id
                                       FROM puntuaciones JOIN usuarios ON puntuaciones.usuario = usuarios.id
                                       WHERE usuarios.email = ?) AND pelicula = ?`,
    
};

// Para paginacion SELECT p.id, p.nombre, p.img FROM peliculas p LIMIT 8, 4; Donde LIMIT [Desplazamiento][numero que aparecen]