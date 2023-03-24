const bcrypt = require('bcrypt');
const views = require('../js/configView');

class LoginController{

	constructor(dao){
		this.loginController = dao;
	}

	getLogin = async (req, res) => {
		// Se redirige a la vista de inicio de sesión
		return res.render(views.login);
	};

	postLogin = async (req, res) => {
		// Nos ha llegado una request con información de inicio de sesión
		const mail = req.body.mail;
		
		const usuario = await dao.getUser(mail);

		// Si el usuario no está registrado informamos del error en la vista
		if (!usuario)
			return res.render(views.login, {errorMessage: 'El usuario no está registrado!'});

		// Si la contraseña es incorrecta
		if (await bcrypt.compare(req.body.pass, usuario.password) == false)
			return res.render(views.login, {errorMessage: 'La contraseña es incorrecta!'});

		// Llegados a este punto, el usuario está registrado y ha introducido su contraseña
		// Guardamos en la sesión el email del usuario para poder identificarlo
		req.session.mail = req.body.mail;

		// A la página principal con la sesión ya iniciada
		return res.redirect('/');
	};
};

module.exports = LoginController;