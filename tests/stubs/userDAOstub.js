class UserDAO {

	constructor(usuarios){
		this.lista = usuarios;
	}
		
	// Devuelve un objeto con la información del usuario o undefined si no existe
	async getUser(mail){
		return this.lista.filter(u => u.mail == mail)[0];
	}
}

module.exports = UserDAO;