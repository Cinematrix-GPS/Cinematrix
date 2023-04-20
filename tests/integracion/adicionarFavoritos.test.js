"use strict"
require('dotenv').config();

process.env.DB_SCHEMA = 'TestingCinematrix';

const { getPool } = require('../../database/configDB');

const UserDAO = require('../../js/daos/userDAO');
