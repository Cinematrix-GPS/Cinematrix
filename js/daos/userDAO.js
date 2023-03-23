'use strict';

const { resolve } = require('path');
const BaseDAO = require('./baseDAO');
const qUser = require('./querysUser');

class userDAO extends BaseDAO {
	
	async createUser(usuario){

		return this.query(qUser.createUser, [usuario.nombreCompl, usuario.username, usuario.correo, usuario.pass]);
	}

	// Comprobamos si existe username
	async isUsername(username){

		return this.query(qUser.existeUsername, [username]);
		/*var result = 

		console.log("PRUEBAS USERDAO"+result);
		if(result == 0){
			resolve(false);
		}
		else{
			resolve(true);
		}
		*/
	}
	
	
}

module.exports = userDAO;