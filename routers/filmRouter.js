"use strict";

const filmRouter = require('express-promise-router')();
const FilmController = require("../controller/filmController");
const multer = require("multer");
const multerFactory = multer({ storage: multer.memoryStorage() });
const views = require("../js/configView");
const {requiresLogin} = require("../middleware/auth");

const {getPool} = require('../database/configDB');
const FilmDAO = require('../js/daos/filmDAO');

const userDao = require('../js/daos/userDAO');

const uDAO = new userDao(getPool());


const fDAO = new FilmDAO(getPool());


const filmController = new FilmController(fDAO, uDAO);


filmRouter.get('/search', async (req, res) => {
    res.status(200);
    res.render(views.index, {  
            title: "Prototipo Cinematrix",
            films: 0});
    // console.log('/films/start');
    // filmController.getlistFilmsStart
});

filmRouter.get('/start',
    
    filmController.getlistFilmsStart
);

filmRouter.post("/list",
    multerFactory.none(),
    filmController.postListByKeyWord
);

filmRouter.get("/listActor",
    multerFactory.none(),
    filmController.getlistFilmsStart
);

filmRouter.get("/getFilmById/:id",
    multerFactory.none(),
    filmController.getFilmByIdCtrl
);

filmRouter.post("/getFilmById/:id",
    requiresLogin,
    multerFactory.none(),
    filmController.getUserRateForFilm
);

module.exports = filmRouter;