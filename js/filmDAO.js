"use strict"
const { resolve } = require("path");

class filmDAO{
    constructor(pool){
        this.pool = pool;
    }

    listMovies(keyWord){
        return new Promise((resolve, reject) => {
            this.pool.getConnection(function(err,connection){
                if(err){
                    reject(new Error("Error de conexión a la base de datos"));
                }
                else{
                    // const q = "SELECT * FROM `peliculas` WHERE nombre like '%"+keyWord+"%' OR sinopsis like '%"+keyWord+"%'";
                    let word = "%" + keyWord+ "%";
                    const q = "SELECT * FROM `peliculas` WHERE nombre like ? OR sinopsis like ?";
                    connection.query(q, [word, word],
                        function(err, films){
                            connection.release();
                            if(err){
                                console.log("ERROR:"+err.message);
                                reject(new Error("Error de acceso a la base de datos"));
                            }
                            else{
                                // console.log(films);
                                if(films.length>0) resolve(films);
                                else resolve(false);
                            }
                        }
                    );
                }
    
            });

        });
    }

    getImg(id){
        return new Promise((resolve, reject) => {
            this.pool.getConnection(function(err,connection){
                if(err){
                    reject(new Error("Error de conexión a la base de datos"));
                }
                else{
                    // const q = "SELECT * FROM `peliculas` WHERE nombre like '%"+keyWord+"%' OR sinopsis like '%"+keyWord+"%'";
                    
                    const q = "SELECT img FROM `peliculas` WHERE id = ?";
                    connection.query(q, [id],
                        function(err, img){
                            connection.release();
                            if(err){
                                console.log("ERROR:"+err.message);
                                reject(new Error("Error de acceso a la base de datos"));
                            }
                            else{
                                console.log(img);
                                if(img.length>0) resolve(img);
                                else resolve(false);
                            }
                        }
                    );
                }
    
            });

        });
    }

    // listaTareas(id){
    //     return new Promise((resolve, reject) => {
    //         this.pool.getConnection(function(err,connection){
    //             if(err){
    //                 reject(new Error("Error de conexión a la base de datos",));
    //             }
    //             else{
    //                 const valor ="SELECT id_tarea, nombre, prioridad, categoria, fechafin ,fechaini, tipo FROM back2study.tareas where id_usuario= ?";
    //                 connection.query(valor, [id],
    //                     function(err, taskList){
    //                         connection.release();
    //                         if(err){
    //                             console.log("ERROR:"+err.message);
    //                             reject(new Error("Error de acceso a la base de datos"));
    //                         }
    //                         else{
    //                             console.log(taskList);
    //                             if(taskList.length>0) resolve(taskList);
    //                             else resolve(false);
                                
    //                         }
    //                 });
    //             }
    
    //         });

    //     });
        
    // }

}

module.exports =filmDAO;