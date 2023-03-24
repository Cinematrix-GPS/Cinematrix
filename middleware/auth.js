const {getUser} = require('../js/daos/userDAO');

const requiresLogin = async (req, res, next) => {
	
	// Si no había un usuario válido en la cookie de la sesión, limpiamos la cookie y vamos al login
	if (!req.session.mail || await getUser(req.session.mail) == null){
		res.clearCookie('token');
		return res.redirect('/login');
	}

	// El usuario existe: todo ok
	next();
}


exports.requiresLogin = requiresLogin;