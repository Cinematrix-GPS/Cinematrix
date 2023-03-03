/*
    La idea de este archivos es la de aglutinar todas las querys. de manera que
    el codigo quede mas limpio
*/
'use strict'


module.exports ={
    /*Hay que refinar esta select, hay que poner exactamente lo que queremos que salga, ademas de que hacer que no se repitan los datos,
    por ejemplo si metemos en el buscador alien salen repetidas las peliculas porque mira todas las coincidencias,
    falta meter datos en director y genero, hacerlo real(consultar https://www.filmaffinity.com/es/main.html) para saber que las select estan bien, 
    las peliculas introducidas en la bdd son poque tienen muchos actores en comun y contiene casi todos los casos que necesitamos
    */
    listKeyWord: "SELECT p.nombre, p.img, p.duracion, p.puntuacion, p.fechaEstreno, p.sinopsis  "+
                "FROM peliculas p"+
                " JOIN actores_peliculas ap"+
                " ON p.id=ap.id_pelicula"+
                " JOIN actores a"+
                " ON ap.id_actor=a.id"+
                " WHERE p.nombre like ?" +
                " OR p.sinopsis like ?"+
                " OR a.nombre like ?"+
                " OR a.apellidos like ?",
    getImg: "SELECT img FROM `peliculas` WHERE id = ?",
    query3: ""
         
} ;