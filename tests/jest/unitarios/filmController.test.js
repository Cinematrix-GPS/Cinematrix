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
	
	test('Búsqueda por título cuando la película NO existe', async () => {
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

describe('Test Controlador de datos basicos...',()=>{
	const dao = new FilmDAO(infoBasic);
	const filmController = new FilmController(dao);

	test('Busqueda de informacion con id existente',async()=>{
		const req = new Request();
		const res = new Response();

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