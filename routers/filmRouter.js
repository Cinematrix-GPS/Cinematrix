"use strict";

const express = require("express");

const filmRouter = express.Router();
const filmController = new (require("../controller/filmController"))();
const multer = require("multer");
const multerFactory = multer({ storage: multer.memoryStorage() });


filmRouter.post("/listMovies",
    multerFactory.none(),
    filmController.getListByKeyWord
);

filmRouter.get("/imagen/:id",
      
    filmController.getImagen
);      

module.exports = filmRouter;