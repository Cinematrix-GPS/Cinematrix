const UserDAO = require('../../stubs/userDAOstub');

const Request = require('../../stubs/requestStub');
const Response = require('../../stubs/responseStub');

const UserController = require('../../../controller/userController');

const usuarios = [
	{
		nombreCompl: 'Jaime Cano',
		username: 'jaimeca',
		correo: 'jaimeca@gmail.com',
		pass: 'aBcDeF1*',
	},
	{
		nombreCompl: 'Jaime Cano',
		username: 'jaimeca',
		correo: 'jaimeca@gmail.com',
		pass: 'j',
	},
	{
		nombreCompl: 'Jaime Cano',
		username: 'jaimeca',
		correo: 'jaimeca@@',
		pass: 'aBcDeF1*',
	},
	{
		nombreCompl: 'Jaime Cano',
		username: 'jaimeca',
		correo: 'jaimeca@@',
		pass: 'j',
	}
];

describe('Test unitario registro con email y contraseña', () => {

	const daoUser = new UserDAO(usuarios);
	
	const userController = new UserController(daoUser);

	test('email y contraseña válidos', async () => {
		const req = new Request();
		const res = new Response();

		req.body = usuarios[0];

		expect(() => userController.addUser(req, res)).not.toThrow();
	});

    test('email correcto y contraseña no válida', async () => {
		const req = new Request();
		const res = new Response();

		req.body = usuarios[1];

		expect(() => userController.addUser(req, res)).toThrow('Contraseña no válida');
	});

    test('email no válido y contraseña válida', async () => {
		const req = new Request();
		const res = new Response();

		req.body = usuarios[2];

		expect(() => userController.addUser(req, res)).toThrow('Correo no válido');
	});

    test('email y contraseña no válidos', async () => {
		const req = new Request();
		const res = new Response();

		req.body = usuarios[3];

		expect(() => userController.addUser(req, res)).toThrow('Contraseña no válida');
		expect(() => userController.addUser(req, res)).toThrow('Correo no válido');
	});

});