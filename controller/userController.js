"use strict";

const views = require("../js/configView");

const { check, validationResult } = require("express-validator");


class userController {

	constructor (dao){
		this.userDAO = dao;
	}

	addUser = async (request, response) => {
		console.log("CONTRROLLER usuario!!!");
		let usuario = {
			nombreCompl: request.body.nombreCompleto,
			username: request.body.username,
			correo: request.body.correo,
			pass: request.body.password,
		};
		// console.log(usuario);

		// Username no debe existir en bdd
		return this.userDAO.createUser(usuario);

		
		//Correo no debe existir en bdd
		/*this.userDAO.isUsername(usuario.username)
		.then(value => {
			console.log("Existe usuario"+value);
			if(value == 0)	return this.userDAO.createUser(usuario);
			else throw "Username ya en uso";
		})
		.then(value => {
			console.log("Existe registo"+value);
			if (value.affectedRows){
				response.render(views.registro,{
					title: "REGISTRO COMPLETO",
					// fallo: "Sin errores"
				});
			}
			else throw "Error en la base de datos"

		})
		.catch(error =>{
			response.render(views.registro,{
				title: error,
				// fallo: error?error:0
			});

		})
		*/
		
	
	};


}

module.exports = userController;



