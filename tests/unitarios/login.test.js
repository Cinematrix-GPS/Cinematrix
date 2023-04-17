
process.env.NODE_ENV = 'testing';

const Request = require('../stubs/requestStub');
const Response = require('../stubs/responseStub');

const UserController = require('../../controller/loginController');
const views = require('../../js/configView');

const DAOFactory = require('../../js/daos/DAOFactory');

const bcrypt = require('bcrypt');

const usuarios = [
	{
		mail: 'angel@gps.es',
		password: '',
		username: 'angel',
		nombreCompleto: 'Ángel Privado Almagro'
	},
	{
		mail: 'carlos@gps.es',
		password: '',
		username: 'carlos',
		nombreCompleto: 'Carlos Manuel Gomes Bianco'
	},
	{
		mail: 'manolo@manolo.manolo',
		password: '',
		username: 'manolo',
		nombreCompleto: 'Manolo Manolín Manuel'
	}
];


describe('Tests de inicio de sesión cuando no hay sesión iniciada.', () => {
	new DAOFactory().getUserDAO().setDAOData(usuarios);
	
	const userController = new UserController();

	test('Inicio de sesión cuando el usuario y contraseña son correctos', async () => {
		usuarios[0].password = await bcrypt.hash('hola', 10);
		
		const req = new Request();
		const res = new Response();

		req.body.mail = 'angel@gps.es';
		req.body.password = 'hola';

		await userController.postLogin(req, res);

		// El inicio de sesión es correcto y nos debe mandar a la pantalla principal
		expect(res.redirect).toHaveBeenCalledWith('/');
	});

	test('Inicio de sesión cuando el usuario no existe', async () => {
		usuarios[0].password = await bcrypt.hash('hola', 10);
		
		const req = new Request();
		const res = new Response();

		req.body.mail = 'noExiste@gps.es';
		req.body.password = 'hola';

		await userController.postLogin(req, res);

		// El inicio de sesión falla y se renderiza la vista de login con un mensaje de error
		expect(res.render).toHaveBeenCalledWith(views.login, expect.objectContaining({
			errorMessage: expect.anything()
		}));
	});

	test('Inicio de sesión cuando la contraseña es incorrecta', async () => {
		usuarios[0].password = await bcrypt.hash('alo', 10);
		
		const req = new Request();
		const res = new Response();

		req.body.mail = 'carlos@gps.es';
		req.body.password = 'contraseña falsa';

		await userController.postLogin(req, res);

		// El inicio de sesión falla y se renderiza la vista de login con un mensaje de error
		expect(res.render).toHaveBeenCalledWith(views.login, expect.objectContaining({
			errorMessage: expect.anything()
		}));
	});
});