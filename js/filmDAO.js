"use strict"
const { resolve } = require("path");
const querys = require("../js/querys");
class filmDAO{
    constructor(pool){
        this.pool = pool;
    }

    /*
        Busqueda global por palabra
    */
    listMovies(keyWord){
        return new Promise((resolve, reject) => {
            this.pool.getConnection(function(err,connection){
                if(err){
                    reject(new Error("Error de conexión a la base de datos"));
                }
                else{
                    // const q = "SELECT * FROM `peliculas` WHERE nombre like '%"+keyWord+"%' OR sinopsis like '%"+keyWord+"%'";
                    let word = "%" + keyWord+ "%";
                    const q = querys.listKeyWord;
                    
                    connection.query(q, [word, word, word, word],
                        function(err, films){
                            connection.release();
                            if(err){
                                console.log("ERROR:"+err.message);
                                reject(new Error("Error de acceso a la base de datos"));
                            }
                            else{
                                console.log(films);
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
                if(err) reject(new Error("Error de conexión a la base de datos"));
                else{
                    const q = querys.getImg;
                    connection.query(q, [id], function(err, img){
                        connection.release();
                        if(err)reject(new Error("Error de acceso a la base de datos "+err.message));
                        else{
                            if(img.length>0) resolve(img);
                            else resolve(false);
                        }
                    });
                }
            });
        });
    }

    

}

module.exports =filmDAO;