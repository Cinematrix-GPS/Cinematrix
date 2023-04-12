const FilmDAO = require('../../stubs/filmDAOstub');
const Request = require('../../stubs/requestStub');
const Response = require('../../stubs/responseStub');

const FilmController = require('../../../controller/filmController');
const views = require('../../../js/configView');

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
    
let salida = {
	pelicula: {	
		id: 2,
		nombre: 'Joker',
		duracion: 122,
		fechaEstreno: '2019-06-18T22:00:00.000Z',
		sinopsis: 'La pasión de Arthur Fleck, un hombre ignorado por la sociedad, es hacer reír a la gente. Sin embargo, una serie de trágicos sucesos harán que su visión del mundo se distorsione considerablemente convirtiéndolo en un brillante criminal.',
		genero: 'Drama'
	},
	actoresV:[  { nombreAct: 'Joaquin', 
	apellidosAct: 'Phoenix' 
	  },
	{ nombreAct: 'Robert',
	 apellidosAct: 'De Niro'
   },
	{ nombreAct: 'Zazie',
	 apellidosAct: 'Beetz' 
	  }],
};

  describe('Test de mostrar datos básicos', () => {

	const dao = new FilmDAO(infoBasic);
	const filmController = new FilmController(dao);

	test('Busqueda de informacion con id existente',async()=>{
		const req = new Request();
		const res = new Response();

		req.params.id=2;

		await filmController.getFilmByIdCtrl(req,res);

		//esperando que funcione
		expect(res.render).toHaveBeenCalledWith(expect.anything(), expect.anything());
		const objetoCapturado = res.render.mock.calls[0][1];		

		expect(objetoCapturado).toEqual(expect.objectContaining({
			actoresV: salida.actoresV,
			pelicula: expect.objectContaining(salida.pelicula)
		}));
	});

	test('Busqueda de informacion con id inexistente',async()=>{
		const req = new Request();
		const res = new Response();

		req.params.id=10000;

		const pelis = dao.averageRate(req.params.id);

		await filmController.getFilmByIdCtrl(req,res);
		
		// Debe intentarse renderizar una vista con datos vacías para que pete
		expect(res.render).toHaveBeenCalledWith(expect.anything(), expect.objectContaining({
			pelicula: undefined,
			actoresV: [],
		}));		
	});

});