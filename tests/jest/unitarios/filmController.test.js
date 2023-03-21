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
	id: 2,
    nombre: "Joker",
    duracion: 122,
    puntuacion: 10,
    fechaEstreno: "2019-06-18T22:00:00.000Z",
    sinopsis: "La pasión de Arthur Fleck, un hombre ignorado por la sociedad, es hacer reír a la gente. Sin embargo, una serie de trágicos sucesos harán que su visión del mundo se distorsione considerablemente convirtiéndolo en un brillante criminal.",
    genero: "Drama",
	nombreAct: "Joaquin", 
	apellidosAct: "Phoenix",
  },{
	id: 2,
    nombre: "Joker",
    duracion: 122,
    puntuacion: 10,
    fechaEstreno: "2019-06-18T22:00:00.000Z",
    sinopsis: "La pasión de Arthur Fleck, un hombre ignorado por la sociedad, es hacer reír a la gente. Sin embargo, una serie de trágicos sucesos harán que su visión del mundo se distorsione considerablemente convirtiéndolo en un brillante criminal.",
    genero: "Drama",
	nombreAct: "Robert",
	apellidosAct: "De Niro",
  },{
	id: 2,
    nombre: "Joker",
    duracion: 122,
    puntuacion: 10,
    fechaEstreno: "2019-06-18T22:00:00.000Z",
    sinopsis: "La pasión de Arthur Fleck, un hombre ignorado por la sociedad, es hacer reír a la gente. Sin embargo, una serie de trágicos sucesos harán que su visión del mundo se distorsione considerablemente convirtiéndolo en un brillante criminal.",
    genero: "Drama",
	nombreAct: "Zazie",
	apellidosAct: "Beetz"
  }];

  
let salida=[{
	idV: 2,
    titleV: 'Joker',
    duracionV: 122,
    fechaEstrenoV: '2019-06-18T22:00:00.000Z',
    sinopsisV: 'La pasión de Arthur Fleck, un hombre ignorado por la sociedad, es hacer reír a la gente. Sin embargo, una serie de trágicos sucesos harán que su visión del mundo se distorsione considerablemente convirtiéndolo en un brillante criminal.',
    generoV: 'Drama',
	actoresV:[  { nombreAct: 'Joaquin', 
	apellidosAct: 'Phoenix' 
	  },
	{ nombreAct: 'Robert',
	 apellidosAct: 'De Niro'
   },
	{ nombreAct: 'Zazie',
	 apellidosAct: 'Beetz' 
	  }],
  }];

salida=salida.sort();
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
		req.params.id=2;

		await filmController.getFilmByIdCtrl(req,res);
		//esperando que funcione
		expect(res.render).toHaveBeenCalledWith(expect.anything(), salida[0]);		
	});



});
