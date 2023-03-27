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
		
	}
	
	async existsMail(mail){
		
		return this.query(qUser.existeMail, [mail]);
		
	}
	
}

module.exports = userDAO;