"use strict";

const views = require("../js/configView");

const { check, validationResult } = require("express-validator");
const bcrypt = require('bcrypt');//Para encriptar passw

class userController {

	constructor (dao){
		this.userDAO = dao;
	}

	addUser = async (request, response) => {

		const errors = validationResult(request);
	
		if (!errors.isEmpty()){
			return response.status(400).json({ errors: errors.array() });
		}
		
	let usuario = {
			nombreCompl: request.body.nombreCompleto,
			username: request.body.username,
			correo: request.body.correo,
			pass: await bcrypt.hash(request.body.password, 10)
		};
		
		// Username no debe existir en bdd
		
		
		
		//Correo no debe existir en bdd
		this.userDAO.isUsername(usuario.username)
		.then(value => {
			if(value.length == 0)	return this.userDAO.existsMail(usuario.correo);
			else throw "Usuario ya en uso";
		})
		.then(value => {
			if(value.length == 0)	return this.userDAO.createUser(usuario);
			else throw "Mail ya en uso";
		})
		.then(value => {
			console.log("Existe registo "+value);
			if (value){
				response.redirect("/films/start");
			}
			else  console.log("Error en la base de datos");

		})
		.catch(error =>{
			response.redirect("/films/start");

		})
		
		
	
	};


}

module.exports = userController;



