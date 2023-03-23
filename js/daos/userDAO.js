'use strict';

const BaseDAO = require('./baseDAO');
const qUser = require('./querysUser');

class userDAO extends BaseDAO {
	
    async createUser(usuario){

		var valid = true;
		var errorSpan = document.getElementById("floatingInput");
		
		document.querySelectorAll()
		if(usuario.nombreCompl === "" || usuario.nick === ""|| usuario.correo === "" || usuario.pass === ""){
			valid = false;
			
		}

		if(valid){
			this.query(qUser.createUser, [usuario.nombreCompl, usuario.nick, usuario.correo, usuario.pass]);
		}
		
	}
	
}

module.exports = userDAO;