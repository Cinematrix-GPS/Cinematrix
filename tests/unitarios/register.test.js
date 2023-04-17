"use strict"

process.env.NODE_ENV = 'testing';

const UserController = require('../../controller/userController');

const FactoriaDAO = require('../../js/daos/DAOFactory');

const Request = require('../stubs/requestStub');
const Response = require('../stubs/responseStub');

const views = require('../../js/configView');

let usuarios = [
	{
		nombreCompleto: "Carmelo Cotón",
		username: "melocotón",
		correo: "carmelo@gmail.com",
		password: "aBcDeF1*"
	},
	{
		nombreCompleto: "Dolores Delano",
		username: "doloresdela",
		correo: "delano@gmail.com",
		password: "aBcDeF1*"
	}
]

function email(email) {
	const verification = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
	return verification.test(email);
}
  
function password(password) {
	const verification = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,100}$/;
	return verification.test(password);
}
  
describe('Registro unitario registro con email y contraseña', () => {

	const request = new Request();
	const response = new Response();

	new FactoriaDAO().getUserDAO().setDAOData(usuarios);

	const controller = new UserController();

	test('Comprueba si el email es válido', () => {
		expect(email('correo@ejemplo.com')).toBe(true);
		expect(email('correoejemplo.com')).toBe(false);
	});
  
	test('Comprueba si la contraseña cumple con los requisitos', () => {
		expect(password('Password1!')).toBe(true);
		expect(password('password')).toBe(false);
		expect(password('PASSWORD')).toBe(false);
		expect(password('Password!')).toBe(false);
		expect(password('Password1')).toBe(false);
		expect(password('Password1!Password1!Password1!Password1!Password1!Password1!Password1!Password1!Password1!Password1!Password1!Password1!')).toBe(false);
	});

	test('Comprueba que un usuario ya esté registrado', async () => {

		request.body = usuarios[0];

		try {
			await controller.addUser(request, response);
		} catch (error) {
			expect(error).toBe("Usuario ya en uso");
		}

	});

	test('Comprueba que un usuario ya esté registrado', async () => {

		request.body = usuarios[1];

		try {
			await controller.addUser(request, response);
		} catch (error) {
			expect(error).toBe("Mail ya en uso");
		}

	});

});