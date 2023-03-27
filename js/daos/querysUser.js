'use strict'

module.exports ={

	readUser:	`SELECT email, password, username, nombreCompleto
				 FROM usuarios
				 WHERE email = ?`
};
