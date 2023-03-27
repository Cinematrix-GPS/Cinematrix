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



userRouter.post("/signup", multerFactory.none(),

    // [check("nombreCompleto","El nombre completo está vacío").notEmpty(),
    // check("username","El nombre de usuario está vacío").notEmpty(),
    // check("correo","Debes introducir un correo electrónico válido").isEmail(),
    // check("password", "La longitud minima debe ser 4").isLength({ min: 4}),
    // check("password2","La contraseña de confirmación debe tener el mismo valor que la contraseña").exists()
    // .custom(( value, {req})=> value === req.body.password)
    // ],

    useRCrtl.addUser,

)


module.exports = userRouter;