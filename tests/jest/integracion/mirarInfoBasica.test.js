const FilmController = require('../../../controller/filmController');

require('dotenv').config();

const {getPool} = require('../../../database/configDB');
const FilmDAO = require('../../../js/daos/filmDAO');

describe('Test de integracion de la informacion basica de una pelicula',()=>{
    const pool = getPool();
	const dao = new FilmDAO(pool);

	// Creamos una película antes de todo
	beforeAll(async () => {
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
		await dao.query(`ALTER TABLE peliculas MODIFY id int(11) NOT NULL AUTO_INCREMENT`);
		
		await dao.query(`CREATE TABLE actores_peliculas (
							id_actor int(11) NOT NULL,
							id_pelicula int(11) NOT NULL
		  				)`);

		await dao.query(`ALTER TABLE actores_peliculas
  						ADD PRIMARY KEY (id_actor,id_pelicula),
  						ADD KEY id_pelicula (id_pelicula)`);

		await dao.query(`CREATE TABLE actores (
							id int(11) NOT NULL,
							nombreAct varchar(30) NOT NULL,
							apellidosAct varchar(40) NOT NULL
		  				)`);

		await dao.query(`ALTER TABLE actores ADD PRIMARY KEY (id)`);

		await dao.query(`ALTER TABLE actores
  						MODIFY id int(11) NOT NULL AUTO_INCREMENT`);			
			
		//await dao.query("DELETE FROM actores_peliculas WHERE id_actor>0 and id_pelicula>0;");
		//await dao.query("DELETE FROM actores WHERE id>0 and id>0;");
		//await dao.query("DELETE FROM peliculas WHERE id>0;");
		await dao.createFilm('Alien: el octavo pasajero', 1, 115, 9, '1979-05-25', 'La tripulación del remolcador espacial Nostromo atiende una señal de socorro y, sin saberlo, sube a bordo una letal forma de vida extraterrestre.', 'Terror');
		
		await dao.query("INSERT INTO actores(id, nombreAct, apellidosAct) values(1,'Sigourney','Weaver');");
		await dao.query("INSERT INTO actores(id, nombreAct, apellidosAct) values(2,'John','Hurt');");
		await dao.query("INSERT INTO actores(id, nombreAct, apellidosAct) values(3,'Ian','Holm');");
		await dao.query("INSERT INTO actores_peliculas(id_actor,id_pelicula) values(1,1)");
		await dao.query("INSERT INTO actores_peliculas(id_actor,id_pelicula) values(2,1)");
		await dao.query("INSERT INTO actores_peliculas(id_actor,id_pelicula) values(3,1)");

	});

	afterAll(async () => {
		await dao.query("DELETE FROM actores_peliculas WHERE id_actor>0 and id_pelicula>0;")
		await dao.query("DELETE FROM actores WHERE id>0;");
		await dao.query("DELETE FROM peliculas WHERE id>0;");
		await dao.query("DROP TABLE actores_peliculas;");
        await dao.query("DROP TABLE actores;");
        await dao.query("DROP TABLE peliculas;");
		await pool.end();
	});


	test('Busqueda de informacion con id existente',async()=>{
		const id=1;
		await dao.getFilmById(id).then(result => {
			
			
			expect(result).toContain([
				expect.objectContaining({
					id: 1,
					nombre: "Alien: el octavo pasajero",
					duracion:115,
					puntuacion: 9,
					fecha:"1979-05-24T22:00:00.000Z",
					sinopsis: "La tripulación del remolcador espacial Nostromo atiende una señal de socorro y, sin saberlo, sube a bordo una letal forma de vida extraterrestre.",
					genero:"Terror",
					nombreAct:"Sigourney",apellidosAct:"Weaver"})
				expect.objectContaining({id: 1,
						nombre: "Alien: el octavo pasajero",
						duracion:115,
						puntuacion: 9,
						fecha:"1979-05-24T22:00:00.000Z",
						sinopsis: "La tripulación del remolcador espacial Nostromo atiende una señal de socorro y, sin saberlo, sube a bordo una letal forma de vida extraterrestre.",
						genero:"Terror",
						nombreAct:"John",apellidosAct:"Hurt"})
				expect.objectContaining({id: 1,
							nombre: "Alien: el octavo pasajero",
							duracion:115,
							puntuacion: 9,
							fecha:"1979-05-24T22:00:00.000Z",
							sinopsis: "La tripulación del remolcador espacial Nostromo atiende una señal de socorro y, sin saberlo, sube a bordo una letal forma de vida extraterrestre.",
							genero:"Terror",
							nombreAct:"Ian",apellidosAct:"Holm"});
		});	
			
	});

})