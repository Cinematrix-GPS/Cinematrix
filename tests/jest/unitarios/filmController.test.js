const FilmDAO = require('../../stubs/filmDAOstub');
const Request = require('../../stubs/requestStub');
const Response = require('../../stubs/responseStub');

const FilmController = require('../../../controller/filmController');
const views = require('../../../js/configView');

const peliculas = [{
	nombre: "Alien",
	img: 1
}, {
	nombre: "Terminator",
	img: 1
}, {
	nombre: "Shrek 1",
	img: 1
}, {
	nombre: "Shrek 2",
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

const comentarios = [
	{	id: 1,
		usuario: 2,
		pelicula: 1,
		texto: "Muy buena película",
		fecha: "10-10-1000"	},
	{ 	id: 2,
		usuario: 2,
		pelicula: 1,
		texto: "Sobrecogedora",
		fecha: "10-10-1000"	},
	{	id: 3,
		usuario: 1,
		pelicula: 2,
		texto: "Impactante",
		fecha: "10-10-1000"	}
];
  
let salida = [{
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

describe('Test Controlador Películas: Buscar por KeyWord', () => {

	const dao = new FilmDAO(peliculas);
	const filmController = new FilmController(dao);

	test('Búsqueda de películas por keyWord cuando la peli existe', async () => {
		const req = new Request();
		const res = new Response();

		req.body.nombreBuscar = "Alien";

		await filmController.postListByKeyWord(req, res);

		// Esperamos que se haya llamado a la función res.render y que se le haya pasado por parámetro lo siguiente
		expect(res.render).toHaveBeenCalledWith(views.index, expect.objectContaining({
			films: expect.arrayContaining([
				peliculas[0]
			])
		}));
	});

	test('Búsqueda de películas por keyWord cuando la peli NO existe', async () => {
		const req = new Request();
		const res = new Response();

		req.body.nombreBuscar = "peli que no existe";

		await filmController.postListByKeyWord(req, res);

		// Esperamos que se llame a request.render con un objeto que tenga un array vacío de films
		expect(res.render).toHaveBeenCalledWith(views.index, expect.objectContaining({
			films: expect.arrayContaining([ ])
		}));
	});

});

describe('Tests Controlador Películas: Buscar por Título', () => {

	const dao = new FilmDAO(peliculas);
	const filmController = new FilmController(dao);

	test('Búsqueda por título cuando la película existe', async () => {
		const req = new Request();
		const res = new Response();

		req.body.titulo = "Shrek";

		await filmController.postListByKeyWord(req, res);

		// Esperamos que el controlador haya llamado a la función render con la vista que esperamos y
		// los datos que esperamos

		expect(res.render).toHaveBeenCalledWith(views.index, expect.anything());

		// Obtenemos el objeto con el que se ha llamado a la función render
		const objetoCapturado = res.render.mock.calls[0][1].films; // Primera llamada, segundo parámetro

		expect(objetoCapturado).toContain(peliculas[3]);
	});
	
	test('Búsqueda por título cuando la película no existe', async () => {
		const req = new Request();
		const res = new Response();

		// Nombre de una película que no existe
		req.body.titulo = "Película que no existe";

		await filmController.postListByKeyWord(req, res);
		
		// Nos fijamos en que la vista a la que redirige es la que debe
		expect(res.render).toHaveBeenCalledWith(views.index, expect.anything());
		
		const objetoCapturado = res.render.mock.calls[0][1].films;

		expect(objetoCapturado).toHaveLength(0);
	});

});

describe('Test de mostrar datos básicos', () => {

	const dao = new FilmDAO(infoBasic);
	const filmController = new FilmController(dao);

	test('Busqueda de informacion con id existente',async()=>{
		const req = new Request();
		const res = new Response();

		req.params.id=2;

		await filmController.getFilmByIdCtrl(req,res);

		//esperando que funcione
		expect(res.render).toHaveBeenCalledWith(expect.anything(), salida[0]);		
	});

	test('Busqueda de informacion con id inexistente',async()=>{
		req.params.id=10000;

		await filmController.getFilmByIdCtrl(req,res);
		//esperando que funcione
		expect(res.render).toHaveBeenCalledWith(expect.anything(),[]);		
	});

});

describe('Test ver comentarios', () => {

	const dao = new FilmDAO(comentarios);
	const filmController = new FilmController(dao);
	
	test('Ver comentarios cuando el comentario existe', async () => {
		const req = new Request();
		const res = new Response();

		req.params.id = 1;

		await filmController.getCommentaries(req, res);

		// Esperamos que se haya llamado a la función res.render y que se le haya pasado por parámetro lo siguiente
		expect(res.render).toHaveBeenCalledWith(expect.anything(), expect.objectContaining(comentarios[0]));
	});

	test('Ver comentarios cuando el comentario no existe', async () => {
		
		const req = new Request();
		const res = new Response();

		req.params.id = 3;
		try {
			await filmController.getCommentaries(req, res);
		} catch (exception) {
			expect(exception.message).toBe("No hay comentarios para esta película");
		}
	});

});