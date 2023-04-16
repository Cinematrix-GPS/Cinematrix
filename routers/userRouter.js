"use strict";

const userRouter = require('express-promise-router')();
const userController = require("../controller/userController");//---------------
const multer = require("multer");
const multerFactory = multer({ storage: multer.memoryStorage() });

const { check,validationResult } = require('express-validator');

const useRCrtl = new userController();



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

)


module.exports = userRouter;