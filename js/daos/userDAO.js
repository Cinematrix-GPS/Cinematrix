'use strict';

const BaseDAO = require('./baseDAO');
const qUser = require('./querysUser');

class userDAO extends BaseDAO {
	
    async createUser(nombreCompleto, username, email, password){
		return this.query(qUser.createUser, [nombreCompleto, username, email, password]);
	}
	
}

module.exports = userDAO;