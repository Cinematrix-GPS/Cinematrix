'use strict';

const BaseDAO = require('./baseDAO');
const qUser = require('./querysUser');

class userDAO extends BaseDAO {
	
    async createUser(usuario){
		return this.query(qUser.createUser, [usuario.nombreCompl, usuario.nick, usuario.correo, usuario.pass]);
	}
	
}

module.exports = userDAO;