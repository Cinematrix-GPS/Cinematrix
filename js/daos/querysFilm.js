'use strict'
/*
En este archivo vamos a guardar los normbres de las vistas, de esta manera cambiamos de forma global
todas las vistas y nos ahorramos muchos fallos innecesarios
*/

module.exports ={
    listFilm:   `SELECT DISTINCT p.nombre, p.img, p.duracion, p.puntuacion, p.fechaEstreno, p.sinopsis
                FROM peliculas p
                    LEFT JOIN actores_peliculas ap ON p.id=ap.id_pelicula
                    LEFT JOIN actores a ON ap.id_actor=a.id
                WHERE p.nombre like ?
                OR p.sinopsis like ?
                OR a.nombre like ?
                OR a.apellidos like ?
                OR p.genero like ?`,
                
    listActorByFilm:    `SELECT DISTINCT a.nombre, a.apellidos FROM peliculas p 
                        LEFT JOIN actores_peliculas ap ON p.id=ap.id_pelicula 
                        LEFT JOIN actores a ON ap.id_actor=a.id WHERE p.nombre like ?;`,

	createFilm: `INSERT INTO peliculas(nombre, img, duracion, puntuacion, fechaEstreno, sinopsis, genero)
							    VALUES(?, ?, ?, ?, ?, ?, ?)`,

    qlistFilmStar: `SELECT p.nombre, p.img
                    FROM peliculas p 
                    ORDER BY P.fechaEstreno DESC;
                    `
};

// Para paginacion SELECT p.id, p.nombre, p.img FROM peliculas p LIMIT 8, 4; Donde LIMIT [Desplazamiento][numero que aparecen]