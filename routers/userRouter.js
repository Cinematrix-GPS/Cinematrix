"use strict";

const userRouter = require('express-promise-router')();
const FilmController = require("../controller/filmController");//---------------
const multer = require("multer");
const multerFactory = multer({ storage: multer.memoryStorage() });
const views = require("../js/configView");//---------------


const {getPool} = require('../database/configDB');

// const FilmDAO = require('../js/daos/filmDAO');//---------------

// const fDAO = new FilmDAO(getPool());
// const filmController = new FilmController(fDAO);

// userRouter.get('/search', async (req, res) => {
    
// });
userRouter.get("/signup", async (req, res) => {
    
    });




module.exports = userRouter;