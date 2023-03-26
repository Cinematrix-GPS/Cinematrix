const BaseDAO = require('./baseDAO');
const queries = require('./querysUser');

class UserDAO extends BaseDAO {
	
	// Devuelve un objeto con la información del usuario o undefined si no existe
	async getUser(mail){
		// El DAO devuelve un array, pero como mail es pk, será un array con un único objeto
        return (await this.query(queries.readUser, [mail]))[0];
    }

}

module.exports = UserDAO;