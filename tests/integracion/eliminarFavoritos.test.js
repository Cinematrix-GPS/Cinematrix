"use strict"
require('dotenv').config();

process.env.DB_SCHEMA = 'TestingCinematrix';

const { getPool } = require('../../database/configDB');

const favDAO = require('../../js/daos/favDAO');

describe('Test de integracion de eliminar favoritos',()=>{
    const pool = getPool();
    const dao= new favDAO(pool);

    beforeAll(async()=>{

       

        await dao.query(`CREATE TABLE peliculas (
            id int(11) NOT NULL,
            nombre varchar(30) NOT NULL,
            img mediumblob NOT NULL,
            duracion int(11) NOT NULL,
            puntuacion int(11) NOT NULL,
            fechaEstreno date NOT NULL,
            sinopsis text NOT NULL,
            genero varchar(32) NOT NULL
            )`);
        
        await dao.query(`ALTER TABLE peliculas ADD PRIMARY KEY (id)`);

        await dao.query(`CREATE TABLE usuarios (
                            id int(11) NOT NULL,
                            nombreCompleto varchar(45) NOT NULL,
                            username varchar(30) NOT NULL,
                            email varchar(255) NOT NULL,
                            password varchar(250) NOT NULL
                            )`);

        await dao.query(`ALTER TABLE usuarios
                            ADD PRIMARY KEY (id)`);

        await dao.query(`ALTER TABLE usuarios
                        MODIFY id int(11) NOT NULL AUTO_INCREMENT`);

        await dao.query(`INSERT INTO peliculas(id,nombre,img,duracion,puntuacion,fechaEstreno,sinopsis,genero) values(1,'Terminator',1,108,10,'1984-10-26','blablabla','Ciencia ficción')`);
        
        await dao.query(`INSERT INTO usuarios(id,nombreCompleto,username,email,password) values(1,'Juan','Juanito','Juantio@jjj.es','1235')`);

        await dao.query(`CREATE TABLE favoritos (
                        id_usuario int NOT NULL,
                        id_pelicula int NOT NULL,
                        PRIMARY KEY (id_usuario, id_pelicula),
                        FOREIGN KEY (id_usuario) REFERENCES usuarios (id) ON DELETE CASCADE ON UPDATE CASCADE,
                        FOREIGN KEY (id_pelicula) REFERENCES peliculas (id) ON DELETE CASCADE ON UPDATE CASCADE
         )`);



    })
    afterAll(async () => {

		await dao.query("DELETE FROM peliculas WHERE id>0;");
		await dao.query("DELETE FROM usuarios WHERE id > 0;");
        await dao.query("DROP TABLE favoritos;");
        await dao.query("DROP TABLE usuarios;");
        await dao.query("DROP TABLE peliculas;");
		await pool.end();
	});

    test('Eliminar favoritos',async()=>{
        const id_pelicula=1;
        const id_usuario=1;

        await dao.deleteFavByUser(id_usuario,id_pelicula).then(result=>{
            expect(result).toEqual(expect.objectContaining({ affectedRows: 0 }));
        })

    });
})