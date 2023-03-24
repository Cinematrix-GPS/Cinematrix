const authRouter = require('express-promise-router')();
const LoginController = require("../controller/loginController");

const views = require('../js/configView');

const {getPool} = require('../database/configDB');

const UserDAO = require('../js/daos/userDAO');

const userDAO = new UserDAO(getPool());
const loginController = new LoginController(userDAO);

authRouter.get('/login', async (req, res) => {
    res.render(views.login, {  
            title: "Prototipo Cinematrix",
            films: 0});
});

authRouter.post('/login', loginController.postLogin);

module.exports = authRouter;