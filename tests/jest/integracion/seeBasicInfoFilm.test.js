/*
const FilmController = require('../../../controller/filmController');

require('dotenv').config();

const {getPool} = require('../../../database/configDB');
const FilmDAO = require('../../../js/daos/filmDAO');

describe('Test de Integracion Ver informacion basica de una Pelicula',()=>{
        const pool=getPool();
        const dao = new FilmDAO(pool);


        //creando la tabla donde se almacenara la informacion basica de la pelicula

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
            await dao.query(`ALTER TABLE peliculas MODIFY id int(11) NOT NULL AUTO_INCREMENT`)

            await dao.query(`CREATE TABLE actores_peliculas (
                            id_actor int(11) NOT NULL,
                            id_pelicula int(11) NOT NULL
              )`);

            await dao.query(`CREATE TABLE actores (
                            id int(11) NOT NULL,
                            nombre varchar(30) NOT NULL,
                            apellidos varchar(40) NOT NULL
              )`)

              await dao.query("DELETE FROM actores_peliculas WHERE id_actor>0 and id_pelicula>0;");
              await dao.query("DELETE FROM peliculas WHERE id>0;");
              await dao.query("DELETE FROM actores WHERE id>0;");
              await dao.query("INSERT INTO actores values(1, 'Arnold', 'Schwarzenegger');");
              await dao.query("INSERT INTO peliculas values(1, 'Terminator',1, 108, 10, '1984-10-26', 'En el año 2029 las máquinas dominan el mundo. Los rebeldes que luchan contra ellas tienen como líder a John Connor, un hombre que nació en los años ochenta. Para eliminarlo y así acabar con la rebelión, las máquinas envían al pasado el robot Terminator con la misión de matar a Sarah Connor, la madre de John, e impedir así su nacimiento. Sin embargo, un hombre del futuro intentará protegerla.', 'Ciencia ficción');");
              await dao.query("INSERT INTO actores_peliculas values(1,1);");
              await dao.getFilmById(1);
        });

        afterAll(async() =>{
            await dao.query("DELETE FROM actores_peliculas WHERE id_actor>0 and id_pelicula>0;");
            await dao.query("DELETE FROM peliculas WHERE id>0;");
            await dao.query("DELETE FROM actores WHERE id>0;");
            await pool.end();
        });

        test('ver una pelicula existente su informacion basica',async()=>{
            const idP=1;
            await dao.getFilmById(idP).then(result=>{
                expect(result).toEqual(expect.arrayContaining([
                    expect.objectContaining({
                        //falta agregar

                    })
                ]))
            });
        });

        test('ver una pelicula que no exista en la Base de Datos',async()=>{
            const idP=20;
            await dao.getFilmById(idP).then(result=>{
                expect(result).toHaveLength(0);
            });
        });


})*/