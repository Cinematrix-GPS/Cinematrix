class UserDAOStub {

	#usuarios = []

	constructor(){
		if (typeof UserDAOStub.instance === 'object')
			return UserDAOStub.instance;

		UserDAOStub.instance = this;
	}

	setDAOData(data){
		this.#usuarios = data;
	}

	async isUsername(username) {
		return this.lista.some(usuario => usuario.username === username);
	}
	
	async existsMail(email) {
		return this.lista.some(usuario => usuario.correo === email);
	}
		
	// Devuelve un objeto con la información del usuario o undefined si no existe
	async getUser(mail){
		return this.#usuarios.filter(u => u.mail == mail)[0];
	}
}

module.exports = UserDAOStub;