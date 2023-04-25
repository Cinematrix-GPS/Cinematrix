const authRouter = require('express-promise-router')();
const LoginController = require("../controller/loginController");

const views = require('../js/configView');

const loginController = new LoginController();

const {requiresLogout} = require('../middleware/auth')

// Sólo se puede acceder al login si no hay sesión iniciada
authRouter.get('/login', requiresLogout, async (req, res) => {
    res.render(views.login, {  
            title: "Prototipo Cinematrix",
            errorMessage: null});
});

authRouter.post('/login', requiresLogout, loginController.postLogin);

module.exports = authRouter;