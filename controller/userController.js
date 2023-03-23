"use strict";

const views = require("../js/configView");


class userController {

	constructor (dao){
		this.userDAO = dao;
	}

	addUser = async (request, response) => {
		console.log("CONTRROLLER usuario!!!");
		let usuario = {
			nombreCompl: request.body.nombreCompleto,
			nick: request.body.username,
			correo: request.body.correo,
			pass: request.body.password,
		};
		console.log(usuario);

		
		await this.userDAO.createUser(usuario)
		.then(insertmsg => {
			console.log(insertmsg);
				response.render(views.registro, {
					title: "REGISTRO COMPLETO"
				});
			}
		)
	
	};


}

module.exports = userController;



