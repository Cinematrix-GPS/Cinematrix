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
    [check("nombreCompleto","El nombre completo está vacío").notEmpty(),
    check("username","El nombre de usuario está vacío").notEmpty(),
    check("correo","El correo está vacío").isEmail(),
    check("password", "La longitud minima debe ser 4").isLength({ min: 4}),
    check("password2"),
    ],
    (req,res) =>{
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
          return res.status(400).json({ errors: errors.array() });
        }
        console.log(errors)

    },
    useRCrtl.addUser

)


module.exports = userRouter;