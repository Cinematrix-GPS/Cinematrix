const BaseDAO = require('./baseDAO');
const queries = require('./querysUser');

class UserDAO extends BaseDAO {
	
	// Devuelve un objeto con la información del usuario o null si no existe
	async getUser(mail){
        const formattedKeyWord = `%${mail}%`; // Para rodear los '?' de '%?%'
        return (await this.query(queries.readUser, [formattedKeyWord]))[0];
    }

}

module.exports = UserDAO;