'use strict';

const { resolve } = require('path');
const BaseDAO = require('./baseDAO');
const qUser = require('./querysUser');

class userDAO extends BaseDAO {
	
	async createUser(usuario) {

		return this.query(qUser.createUser, [usuario.nombreCompl, usuario.username, usuario.correo, usuario.pass]);
	}

	// Comprobamos si existe username
	async isUsername(username) {
		return this.query(qUser.existeUsername, [username]);
	}
	
	async existsMail(mail) {
		
		return this.query(qUser.existeMail, [mail]);
		
	}
	
	async getUser(mail) {
		// El DAO devuelve un array, pero como mail es pk, será un array con un único objeto
        return (await this.query(qUser.readUser, [mail]))[0];
    }
	
}

module.exports = userDAO;