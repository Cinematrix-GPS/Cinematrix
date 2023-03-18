'use strict'
/*
En este archivo vamos a guardar los normbres de las vistas, de esta manera cambiamos de forma global
todas las vistas y nos ahorramos muchos fallos innecesarios
*/

module.exports ={
    //Para obtener los comentarios como el id cada vez es más alto significa que es más reciente cumpliendo la HU
    GetComentaries: `SELECT p.nombre_usuario, p.texto
                     FROM comentarios
                     WHERE p.id_pelicula=id_pelicula
                     ORDER BY id DESC`,
};

// Para paginacion SELECT p.id, p.nombre, p.img FROM peliculas p LIMIT 8, 4; Donde LIMIT [Desplazamiento][numero que aparecen]