const UserDAO = require('../../stubs/userDAOstub');

const Request = require('../../stubs/requestStub');
const Response = require('../../stubs/responseStub');

const FilmController = require('../../../controller/filmController');

const usuarios = [
	{
		email: 'hola@gmail.com',
		password: 'aBcDeF1*',
	},
	{
		email: 'hola@gmail.com',
		password: 'a',
	},
	{
		id: 'hola@@',
		mail: 'aBcDeF1*',
	},
	{
		id: 'hola@@',
		mail: 'a',
	}
];

describe('Test unitario registro con email y contraseña', () => {

	const daoUser = new UserDAO(usuarios);
	
	const filmController = new FilmController(dao, daoUser);

	test('email y contraseña correctos', async () => {
		const req = new Request();
		const res = new Response();

		//await filmController.(req, res);
	});

    test('email correcto y contraseña incorrecta', async () => {
		const req = new Request();
		const res = new Response();

		//await filmController.(req, res);
	});

    test('email incorrecto y contraseña correcta', async () => {
		const req = new Request();
		const res = new Response();

		//await filmController.(req, res);
	});

    test('email y contraseña incorrectos', async () => {
		const req = new Request();
		const res = new Response();

		//await filmController.(req, res);
	});

});