"use strict"

const Response = require('../../stubs/responseStub');
const views = require('../../../js/configView');
const userRouter = require('../../../routers/userRouter');

userRouter.post = jest.fn();

const usuarios = [
	{
		nombreCompleto: 'Jaime Cano',
		username: 'jaimeca',
		correo: 'jaimeca@gmail.com',
		password: 'aBcDeF1*',
	},
	{
		nombreCompleto: 'Jaime Cano',
		username: 'jaimeca',
		correo: 'jaimeca@gmail.com',
		password: 'j',
	},
	{
		nombreCompleto: 'Jaime Cano',
		username: 'jaimeca',
		correo: 'jaimeca@@',
		password: 'aBcDeF1*',
	},
	{
		nombreCompleto: 'Jaime Cano',
		username: 'jaimeca',
		correo: 'jaimeca@@',
		password: 'j',
	}
];

describe('Test unitario registro con email y contraseña', () => {

	test('email y contraseña válidos', async () => {
		const res = new Response();

		userRouter.post('/signup', usuarios[0]);
		expect(userRouter.post).toHaveBeenCalledWith('/signup', usuarios[0]);

		expect(res.render).toHaveBeenCalledWith(views.registro, expect.objectContaining({
			validaciones: null
		}));
	});

    test('email correcto y contraseña no válida', async () => {
		const res = new Response();

		userRouter.post('/signup', usuarios[1]);
		expect(userRouter.post).toHaveBeenCalledWith('/signup', usuarios[1]);

		const errors = ["La contraseña debe contener al menos una letra minúscula, una letra mayúscula, un número y un carácter especial", "La longitud minima de la contraseña debe ser 8"];

		expect(res.render).toHaveBeenCalledWith(views.registro, expect.objectContaining({
			validaciones: errors
		}));
	});

    test('email no válido y contraseña válida', async () => {
		const res = new Response();

		userRouter.post('/signup', usuarios[2]);
		expect(userRouter.post).toHaveBeenCalledWith('/signup', usuarios[2]);

		expect(res.render).toHaveBeenCalledWith(views.registro, expect.objectContaining({
			validaciones: "Dirección de correo no válida"
		}));
	});

    test('email y contraseña no válidos', async () => {
		const res = new Response();

		userRouter.post('/signup', usuarios[3]);
		expect(userRouter.post).toHaveBeenCalledWith('/signup', usuarios[3]);

		const errors = ["La contraseña debe contener al menos una letra minúscula, una letra mayúscula, un número y un carácter especial", "Dirección de correo no válida", "La longitud minima de la contraseña debe ser 8"];

		expect(res.render).toHaveBeenCalledWith(views.registro, expect.objectContaining({
			validaciones: errors
		}));
	});

});