'use strict'
/*
En este archivo vamos a guardar los normbres de las vistas, de esta manera cambiamos de forma global
todas las vistas y nos ahorramos muchos fallos innecesarios
*/

module.exports ={
   
    createUser : `INSERT INTO usuarios (nombreCompleto, username, email, password) 
                VALUES (?, ?, ?, ?);`,

    existeUsername: `SELECT count(username) 
                    FROM usuarios WHERE username=?;`
    
};

// Para paginacion SELECT p.id, p.nombre, p.img FROM peliculas p LIMIT 8, 4; Donde LIMIT [Desplazamiento][numero que aparecen]