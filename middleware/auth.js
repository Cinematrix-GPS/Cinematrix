const UserDAO = require('../js/daos/userDAO');
const {getPool} = require('../database/configDB');
const dao = new UserDAO(getPool());

const requiresLogin = async (req, res, next) => {
	
	// Si no había un usuario válido en la cookie de la sesión, limpiamos la cookie y vamos al login
	if (!req.session.mail || await dao.getUser(req.session.mail) == null) {
		res.clearCookie('token');
		return res.redirect('/login');
	}

	// El usuario existe: todo ok
	next();
};

const requiresLogout = async (req, res, next) => {
	// Si no hay sesión registrada, siguiente
	if (!req.session.mail)
		return next();
	
	res.redirect('/');
};

exports.requiresLogin = requiresLogin;
exports.requiresLogout = requiresLogout;