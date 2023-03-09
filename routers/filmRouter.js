"use strict";

const filmRouter = require('express-promise-router')();
const filmController = new (require("../controller/filmController"));
const multer = require("multer");
const multerFactory = multer({ storage: multer.memoryStorage() });
const views = require("../js/configView");

filmRouter.get('/search', async (req, res) => {
    res.status(200);
    res.render(views.index, {  
            title: "Prototipo Cinematrix",
            films: 0});
});

filmRouter.post("/list",
    multerFactory.none(),
    filmController.postListByKeyWord
);

filmRouter.post("/listActor",
    multerFactory.none(),
    filmController.postlistActoreByFilm
);

module.exports = filmRouter;