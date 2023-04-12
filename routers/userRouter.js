"use strict";

const userRouter = require('express-promise-router')();
const userController = require("../controller/userController");//---------------
const multer = require("multer");
const multerFactory = multer({ storage: multer.memoryStorage() });
const views = require("../js/configView");//---------------


const {getPool} = require('../database/configDB');
const userDao = require('../js/daos/userDAO');
const { check,validationResult } = require('express-validator');

const uFAO = new userDao(getPool());
const useRCrtl = new userController(uFAO);
//Inicio de sesion
const {requiresLogout} = require('../middleware/auth');


userRouter.post("/signup", multerFactory.none(),

    // [check("nombreCompleto","El nombre completo está vacío").notEmpty(),
    // check("username","El nombre de usuario está vacío").notEmpty(),
    // check("correo","Debes introducir un correo electrónico válido").isEmail(),
    // check("password", "La longitud minima debe ser 4").isLength({ min: 4}),
    // check("password2","La contraseña de confirmación debe tener el mismo valor que la contraseña").exists()
    // .custom(( value, {req})=> value === req.body.password)
    // ],
    check("username", "El nombre de usuario esta vacio").notEmpty(),
    check("correo","Dirección de correo no válida o vacia").isEmail(),
    check("password", "La logintud minima debe ser 4").isLength({ min: 4}),
    check("password2")
    .custom((value, { req }) => {
        if (value !== req.body.password) {
            throw new Error('Las contraseñas no son iguales');
        }
        return true;
    }),
    useRCrtl.addUser,

);

// Sólo se puede acceder al login si no hay sesión iniciada
userRouter.get('/loginForm', 
    requiresLogout, 
    async (req, res) => {
        res.render(views.login, {  
            title: "Prototipo Cinematrix",
            errorMessage: null});
});

userRouter.post('/login', 
    requiresLogout, 
    useRCrtl.postLogin);


module.exports = userRouter;