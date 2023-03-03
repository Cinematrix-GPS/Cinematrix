"use strict";

const config = require("../js/config");
const mysql = require("mysql");

const pool = mysql.createPool(config.databaseConfig);
const film_DAO = require('../js/filmDAO');

const film_Dao = new film_DAO(pool);

const arv = require("../js/viewConfig");
class filmController {

    getListByKeyWord(request, response){
        console.log("controlador pelicula");
        film_Dao.listMovies(request.body.nombreBuscar)
        .then(filmsList => {
            response.render(arv.index, {
                            title: "Mostrando Resultados", 
                            films: filmsList?filmsList:0
                         });
            
        })
        .catch(error => {response.status(500)});
    }

    getImagen(request, response){
        // console.log("controlador imagen");
        

        console.log("controlador imagen "+ request.body);
        film_Dao.getImg(request.params.id)
        .then(img => {
            if (img) {
                console.log("IMAGEN: "+img);
                // const encode = (img) => {
                //     let buf = Buffer.from(img);
                //     let base64 = buf.toString('base64');
                //     return base64
                //   }
                //   const imagen = encode(request.Body);
                response.end(img);
            }
            else console.log("NO IMAGEN");
        })
        .catch(error => {response.status(500)});     
    };

    // getImagen(request, response){
    //     console.log("controlador imagen");
    //     film_Dao.getImg(request.params.id, function(err, imagen){
    //         if(err){
    //             response.status(500);
    //         }
    //         else{
    //             if (imagen) {
                    
    //                 response.end(imagen);
    //             } else {
    //                 //ASIGNAR UNA POR DEFECTO!!
    //                 response.status(404);
    //                 response.end("Not found");
    //             }
    //         }

    //     });
             
    // };
}


    // getImagen(request, response) {
    
    //     //let users =new DaoUsers(pool);
    //     users.obtenerImagen (request.params.id, function(err, imagen) {
    //         if(err){
    //             response.status(500);
    //         }
    //         else{
    //             if (imagen) {
                    
    //                 response.end(imagen);
    //             } else {
    //                 //ASIGNAR UNA POR DEFECTO!!
    //                 response.status(404);
    //                 response.end("Not found");
    //             }
    //         }
            
    //     });
    // }



module.exports = filmController;