const FilmDAO = require('../../stubs/filmDAOstub');


const FilmController = require('../../../controller/filmController');

const peliculas = [{
	nombre: "Alien",
	img: 1
}, {
	nombre: "Terminator",
	img: 1
}, {
	nombre: "Shrek",
	img: 1
}];

const infoBasic=[{
	nombre:	"Terminator",
	id: 1,
	img: 1,
	duracion: 108,
	puntuacion: 10,
	fechaEstreno: "1984-10-26",
	sinopsis: "En el año 2029 las máquinas dominan el mundo. Los rebeldes que luchan contra ellas tienen como líder a John Connor, un hombre que nació en los años ochenta. Para eliminarlo y así acabar con la rebelión, las máquinas envían al pasado el robot Terminator con la misión de matar a Sarah Connor, la madre de John, e impedir así su nacimiento. Sin embargo, un hombre del futuro intentará protegerla.",
	genero: "Ciencia ficción",
	Actores: [ {nombreAct:"Arnold",apellidosAct: "Schwarzenegger"},{nombreAct:"Linda",apellidosAct: "Hamilton"},{nombreAct:"Michael",apellidosAct: "Biehn"}]
}];


describe('Test Controlador Películas', () => {
	const dao = new FilmDAO(peliculas);
	const filmController = new FilmController(dao);

	const req = {
		body: {},
		query: {},
		params: {}
	};

	const res = {
		send: jest.fn(),
		json: jest.fn(),
		render: jest.fn()
	};

	test('Búsqueda de películas por keyWord cuando la peli existe', async () => {
		req.body.nombreBuscar = "Alien";

		await filmController.postListByKeyWord(req, res);

		// Esperamos que se haya llamado a la función res.render y que se le haya pasado por parámetro lo siguiente
		expect(res.render).toHaveBeenCalledWith(expect.anything(), expect.objectContaining({
			films: expect.arrayContaining([
				peliculas[0]
			])
		}));
	});

	test('Búsqueda de películas por keyWord cuando la peli NO existe', async () => {
		req.body.nombreBuscar = "peli que no existe";

		await filmController.postListByKeyWord(req, res);

		// Esperamos que se llame a request.render con un objeto que tenga un array vacío de films
		expect(res.render).toHaveBeenCalledWith(expect.anything(), expect.objectContaining({
			films: expect.arrayContaining([ ])
		}));
	});
});
	//dao.basicInfoFilms(req.body.)




describe('Test Controlador de datos basicos...',()=>{
	const dao = new FilmDAO(infoBasic);
	const filmController = new FilmController(dao);

	const req = {
		body: {},
		query: {},
		params: {}
	};

	const res = {
		send: jest.fn(),
		json: jest.fn(),
		render: jest.fn()
	};
	test('Busqueda de informacion con id existente',async()=>{
		req.params.id=[1];

		await filmController.getFilmByIdCtrl(req,res);
		//esperando que funcione
		expect(res.render).toHaveProperty('titleV',infoBasic[0].nombre);
		expect(res.render).toHaveProperty('idV',infoBasic[0].id);
		expect(res.render).toHaveProperty('sinopsisV',infoBasic[0].sinopsis);
		expect(res.render).toHaveProperty('generoV',infoBasic[0].genero);
		expect(res.render).toHaveProperty('actoresV',infoBasic[0].Actores);
		expect(res.render).toHaveProperty('duracionV',infoBasic[0].duracion);
	});

	/*test('Busqueda de informacion con id no existente',async()=>{
		req.params.id=100;

		await filmController.getFilmByIdCtrl(req,res);

		expect(res.render).toHaveProperty('titleV',infoBasic[0].nombre);
		expect(res.render).toHaveProperty('idV',infoBasic[0].id);
		expect(res.render).toHaveProperty('sinopsisV',infoBasic[0].sinopsis);
		expect(res.render).toHaveProperty('generoV',infoBasic[0].genero);
		expect(res.render).toHaveProperty('actoresV',infoBasic[0].Actores);
		expect(res.render).toHaveProperty('duracionV',infoBasic[0].duracion);
	});*/
});
