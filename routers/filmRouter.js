"use strict";

const filmRouter = require('express-promise-router')();
const filmController = require("../controller/filmController");
const multer = require("multer");
const multerFactory = multer({ storage: multer.memoryStorage() });
const views = require("../js/viewConfig");

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

module.exports = filmRouter;