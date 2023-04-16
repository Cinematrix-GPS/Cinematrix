process.env.NODE_ENV = 'testing';

const Request = require('../stubs/requestStub');
const Response = require('../stubs/responseStub');

const FilmController = require('../../controller/filmController');
const views = require('../../js/configView');

const DAOFactory = require('../../js/daos/DAOFactory');

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

let puntuaciones = [{
		mail: 'angel@gps.es',
		id: 1,
		punctuation: 10
	}, {
		mail: 'manolo@gps.es',
		id: 2,
		punctuation: 5
	}
]

  describe('Test de mostrar datos básicos', () => {

	const factoria = new DAOFactory();

	// Inicializamos los DAOs de mentira con la información que queremos de prueba
	const filmDAO = factoria.getFilmDAO(); filmDAO.setDAOData(infoBasic);
	const commentDAO = factoria.getCommentDAO(); commentDAO.setDAOData(infoBasic);
	const rateDAO = factoria.getRateDAO(); rateDAO.setDAOData(puntuaciones);

	const filmController = new FilmController();

	test('Busqueda de informacion con id existente', async()=>{
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

		//const pelis = rateDAO.averageRate(req.params.id);

		await filmController.getFilmByIdCtrl(req,res);
		
		// Debe intentarse renderizar una vista con datos vacías para que pete
		expect(res.render).toHaveBeenCalledWith(expect.anything(), expect.objectContaining({
			pelicula: undefined,
			actoresV: [],
		}));		
	});

});