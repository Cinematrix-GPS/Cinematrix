"use strict";

const express = require("express");

const filmRouter = express.Router();
const filmController = new (require("../controller/filmController"))();


filmRouter.post("/listMovies",
    filmController.getListByKeyWord
)

module.exports = filmRouter;