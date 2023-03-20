'use strict'
/*
En este archivo vamos a guardar los normbres de las vistas, de esta manera cambiamos de forma global
todas las vistas y nos ahorramos muchos fallos innecesarios
*/

module.exports ={
   
    setuser = `INSERT INTO usuarios (id, nombreCompleto, username, email, password) VALUES (NULL, ?, ?, ?, ?);`
    
};

// Para paginacion SELECT p.id, p.nombre, p.img FROM peliculas p LIMIT 8, 4; Donde LIMIT [Desplazamiento][numero que aparecen]