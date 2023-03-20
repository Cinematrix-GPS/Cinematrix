"use strict";

const userRouter = require('express-promise-router')();
const userController = require("../controller/userController");//---------------
const multer = require("multer");
const multerFactory = multer({ storage: multer.memoryStorage() });
const views = require("../js/configView");//---------------


const {getPool} = require('../database/configDB');
const userDao = require('../js/daos/userDAO');

const uFAO = new userDao(getPool());
const useRCrtl = new userController(uFAO);


userRouter.post("/signup",
        multerFactory.none(),
        useRCrtl.addUser
    );




module.exports = userRouter;