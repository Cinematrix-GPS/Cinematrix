'use strict';
class BaseDAO {
	pool;

	constructor(pool){
        // Para tener la pool de conexiones a la base de datos
		this.pool = pool;
    }

	// Devuelve una promesa que se resuelve con una conexión a la base de datos o que se rechaza con un error
	async getConnection() {
		return new Promise((resolve, reject) => {
			this.pool.getConnection((err, connection) => {
				if (err) {
					console.error(`Error al obtener la conexión a la base de datos: ${err}`);
					reject(err);
				} else resolve(connection);
			});
		});
	}

	// Recibe todos los parámetros de la query
	async query(...params) {
		// Obtenemos la conexión y devolvemos una promesa que se resuelve con el resultado de la consulta
		const connection = await this.getConnection();

		return new Promise((resolve, reject) => {
			connection.query(...params, (err, result) => {
				
				connection.release(); // IMPORTANTE: liberamos la conexión una vez tenemos los resultados
				console.log("RESULTADO QUERY");
				console.log(result);
				(err) ? reject(err):resolve(result);
				
			})
		});
	}

	
}

module.exports = BaseDAO;