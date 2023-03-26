"use strict";

const views = require("../js/configView");

const { check, validationResult } = require("express-validator");


class userController {

	constructor (dao){
		this.userDAO = dao;
	}

	addUser = async (request, response) => {

		const errors = validationResult(request);
	
		if (!errors.isEmpty()){
			return response.status(400).json({ errors: errors.array() });
		}
		

		console.log("CONTRROLLER usuario!!!");
		let usuario = {
			nombreCompl: request.body.nombreCompleto,
			username: request.body.username,
			correo: request.body.correo,
			pass: request.body.password,
		};
		console.log(usuario);

		// Username no debe existir en bdd
		
		
		
		//Correo no debe existir en bdd
		this.userDAO.isUsername(usuario.username)
		.then(value => {
			console.log("Existe usuario"+value);
			if(value == "")	return this.userDAO.createUser(usuario);
			else throw "Usuario ya en uso";
		})
		.then(value => {
			console.log("Existe registo"+value);
			if (value){
				response.render(views.registro,{
					title: "REGISTRO COMPLETO",
					fallo: "Sin errores"
				});
			}
			else  console.log("Error en la base de datos");

		})
		.catch(error =>{
			response.render(views.registro,{
				title: error,
				fallo: error?error:0
			});

		})
		
		
	
	};


}

module.exports = userController;



