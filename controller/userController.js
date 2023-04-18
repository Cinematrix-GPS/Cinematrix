const bcrypt = require('bcrypt');
const views = require('../js/configView');
const { check, validationResult } = require("express-validator");


const DAOFactory = require('../js/daos/DAOFactory');

class userController {

	constructor (){
		const factoria = new DAOFactory();

		this.userDAO = factoria.getUserDAO();
	}

	getLogin = async (req, res) => {
		// Se redirige a la vista de inicio de sesión
		return res.render(views.login, {
			title: 'Identifícate',
			errorMessage: null
		});
	};

	postLogin = async (req, res) => {
		// Nos ha llegado una request con información de inicio de sesión
		const mail = req.body.mail;

		const usuario = await this.userDAO.getUser(mail);

		console.log(`usuario: ${JSON.stringify(usuario)}`);

		// Si el usuario no está registrado informamos del error en la vista
		if (!usuario)
			return res.render(views.login, { errorMessage: '¡El usuario no está registrado!', title: 'Identifícate' });

		// Si la contraseña es incorrecta
		if (await bcrypt.compare(req.body.password, usuario.password) == false)
			return res.render(views.login, { errorMessage: '¡La contraseña es incorrecta!', title: 'Identifícate' });

		// Llegados a este punto, el usuario está registrado y ha introducido su contraseña
		// Guardamos en la sesión el email del usuario para poder identificarlo
		
		req.session.idUser = usuario.id;
		req.session.mail = req.body.mail;
		req.session.username = usuario.username;

		// A la página principal con la sesión ya iniciada
		return res.redirect('/');
	};
	getRegistro = async (req, res) => {
		// Se redirige a la vista de inicio de sesión
		return res.render(views.registro, {
			title: 'Registro',
			films:0,
			msg: "",
			username: ""
		});
	};
	addUser = async (request, response) => {

		const errors = validationResult(request);

		const valores = request.body;
		const validaciones = errors.array();


		if (!errors.isEmpty()){
			//return response.status(400).json({ errors: errors.array() });
			response.render(views.registro, {
			title: "Registro con errores",
			films:0,
			msg:null,
			validaciones: validaciones,
			valores:valores,
			username: request.session.username?request.session.username:0
			});
		}
		else{ //SIN ERRORES
			let usuario = {
				nombreCompl: request.body.nombreCompleto,
				username: request.body.username,
				correo: request.body.correo,
				pass: await bcrypt.hash(request.body.password, 10)
			};
			
			// Username no debe existir en bd
			// Correo no debe existir en bdd
			var iguales;

			this.userDAO.isUsername(usuario.username)
			.then(value => {
				if (value.length == 0) return this.userDAO.existsMail(usuario.correo);
				else {
					iguales = "Ya existe un usuario con ese username";
					throw "Usuario ya en uso";
				} 
			})
			.then(value => {
				if (value.length == 0) return this.userDAO.createUser(usuario);
				else {
					iguales = "Ese E-Mail ya está en uso";
					throw "Mail ya en uso";
				} 
			})
			.then(value => {
				if (value) {
					response.redirect("/films/start");
				}
				else console.log("Error en la base de datos");
	
			})
			.catch(error =>{
				response.render(views.registro, {
					title: "Registro con errores",
					films:0,
					msg:null,
					iguales: iguales,
					valores:valores,
					username: request.session.username?request.session.username:0
				});	
			})

		}
	
	};
};

module.exports = userController;