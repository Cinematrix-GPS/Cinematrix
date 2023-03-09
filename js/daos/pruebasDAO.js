"use strict";

const {getPool} = require('../database/configDB');


const FilmDAO = require('../js/daos/filmDAO');
const fDAO = new FilmDAO(getPool());


fDAO.listFilms('Terminator');