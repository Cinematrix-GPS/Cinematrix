const bcrypt = require('bcrypt');
const views = require('../js/configView');

class LoginController{

	constructor(dao){
		this.dao = dao;
	}

	getLogin = async (req, res) => {
		// Se redirige a la vista de inicio de sesión
		return res.render(views.login, {
			title: 'Identifícate',
			errorMessage: null
		});
	};

	postLogin = async (req, res) => {
		// Nos ha llegado una request con información de inicio de sesión
		const mail = req.body.mail;

		const usuario = await this.dao.getUser(mail);

		console.log(`usuario: ${JSON.stringify(usuario)}`);

		// Si el usuario no está registrado informamos del error en la vista
		if (!usuario)
			return res.render(views.login, { errorMessage: '¡El usuario no está registrado!', title: 'Identifícate' });

		// Si la contraseña es incorrecta
		if (await bcrypt.compare(req.body.password, usuario.password) == false)
			return res.render(views.login, { errorMessage: '¡La contraseña es incorrecta!', title: 'Identifícate' });

		// Llegados a este punto, el usuario está registrado y ha introducido su contraseña
		// Guardamos en la sesión el email del usuario para poder identificarlo
		req.session.mail = req.body.mail;
		req.session.username = usuario.username;

		// A la página principal con la sesión ya iniciada
		return res.redirect('/');
	};
};

module.exports = LoginController;