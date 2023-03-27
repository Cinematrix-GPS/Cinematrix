const authRouter = require('express-promise-router')();
const LoginController = require("../controller/loginController");

const views = require('../js/configView');

const {getPool} = require('../database/configDB');

const UserDAO = require('../js/daos/userDAO');

const userDAO = new UserDAO(getPool());
const loginController = new LoginController(userDAO);

const {requiresLogout} = require('../middleware/auth')

// Sólo se puede acceder al login si no hay sesión iniciada
authRouter.get('/iniciar', requiresLogout, async (req, res) => {
    res.render(views.iniciar, {  
            title: "Prototipo Cinematrix",
            films: 0});
});

authRouter.post('/iniciar', requiresLogout, loginController.postLogin);

module.exports = authRouter;