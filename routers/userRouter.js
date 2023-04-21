"use strict";

const userRouter = require('express-promise-router')();
const userController = require("../controller/userController");
const multer = require("multer");
const views = require('../js/configView');

const multerFactory = multer({ storage: multer.memoryStorage() });

const { check, validationResult } = require('express-validator');
const useRCrtl = new userController();

//Inicio de sesion
const {requiresLogout} = require('../middleware/auth');

userRouter.post("/signup", multerFactory.none(),
    check("password","La contraseña debe contener al menos una letra minúscula, una letra mayúscula, un número y un carácter especial").matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!#$%&'*+-/=.?^_{|}@(),:;<>@[])/),
    check("correo","Dirección de correo no válida").isEmail(),
    check("password", "La longitud minima de la contraseña debe ser 8").isLength({ min: 8}),
    check("password", "La longitud máxima de la contraseña es de 100 carácteres").isLength({ max: 100}),
    check("password2")
    .custom((value, { req }) => {
        if (value !== req.body.password) {
            throw new Error('Las contraseñas no son iguales');
        }
        return true;
    }),
    useRCrtl.addUser,
);

userRouter.get('/signup', 
    requiresLogout, 
    async (req, res) => {
        res.render(views.registro, {  
            title: "Registro usuario",
            msg: null});
});

userRouter.get("/signout", function(request, response) {
    request.session.destroy();
    response.redirect("/films/start");
});

// Sólo se puede acceder al login si no hay sesión iniciada
userRouter.get('/loginForm', 
    requiresLogout, 
    async (req, res) => {
        res.render(views.login, {  
            title: "Prototipo Cinematrix",
            errorMessage: null,
            username: req.session.username?req.session.username:0
        });
});

userRouter.post('/login', 
    requiresLogout, 
    useRCrtl.postLogin);


module.exports = userRouter;