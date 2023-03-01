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
                    console.log("conexion con la bbdd "+keyWord);
                    resolve(true);
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