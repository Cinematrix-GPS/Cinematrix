"use strict";

const config = require("../js/config");
const mysql = require("mysql");

const pool = mysql.createPool(config.databaseConfig);
const film_DAO = require('../js/filmDAO');

const film_Dao = new film_DAO(pool);

class filmController {

    getListByKeyWord(request, response){
        console.log("controlador pelicula");
        film_Dao.listMovies(request.body.nombreBuscar);
    }

    // getListTareas(request, response){

    //     daoTareas.listaTareas(request.session.id_)
    //     .then(tareas =>{
    //         // tareas.array.forEach(element => {
    //         //     console.log(element);
    //         // });

    //         response.render("principal", {
    //                         title: "", 
    //                         nameUser: request.session.userName, 
    //                         mailUser: request.session.mail,
    //                         tareas: tareas?tareas:0,
    //                         deleteId: false 
    //         });
    //     })
    //     .catch(error =>{  response.status(500);  });
    // }

}

module.exports = filmController;