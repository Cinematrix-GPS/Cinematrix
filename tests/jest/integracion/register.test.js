require('dotenv').config();

const { getPool } = require('../../../database/configDB');

const UserDAO = require('../../../js/daos/userDAO');

const userRouter = require('./userRouter');
userRouter.post = jest.fn();

describe('Test de integración registro con email y contraseña', () => {

	const pool = getPool();
	const dao = new UserDAO(pool);
	
	beforeAll(async () => {
			
		await dao.query(`CREATE TABLE usuarios (
							id int(11) NOT NULL,
							nombreCompleto varchar(45) NOT NULL,
							username varchar(30) NOT NULL,
							email varchar(255) NOT NULL,
							password varchar(250) NOT NULL
						)`);

		await dao.query("DELETE FROM usuarios WHERE id > 0;");

		const correct = await dao.createUser('Jaime Cano', 'jaimeca', 'jaimeca@@', 'aBcDeF1*');
        // const email = await dao.createUser('Jaime Cano', 'jaimeca', 'jaimeca@gmail.com', 'j');
        // const password = await dao.createUser('Jaime Cano', 'jaimeca', 'jaimeca@@', 'aBcDeF1*');
        // const wrong = await dao.createUser('Jaime Cano', 'jaimeca', 'jaimeca@@', 'j');
		
	});

	afterAll(async () => {
		await dao.query("DELETE FROM usuarios WHERE id > 0;");

		await dao.query("DROP TABLE peliculas;");
        await dao.query("DROP TABLE usuarios;");
        await dao.query("DROP TABLE comentarios;");
		await dao.query("DROP TABLE actores_peliculas;");
		await dao.query("DROP TABLE actores;");
		await pool.end();
	});

	test('Registro con email y contraseña válidos', async () => {

		await dao.createUser(correct).then(result => {
			expect(result).toEqual(expect.arrayContaining([
                expect.objectContaining({
					nombreCompleto: "Jaime Cano",
					username: "jaimeca",
					email: "jaimeca@gmail.com",
					password: "aBcDeF1*"
				})
			]))
		});
	});

	/*test('Registro con email válido y contraseña no válida', async () => {

		await dao.getFilmCommentaries(email).then(result => {
			expect(result).toEqual(expect.arrayContaining([
                null
			]))
		});
	});

	test('Registro con email no válido y contraseña válida', async () => {

		await dao.getFilmCommentaries(password).then(result => {
			expect(result).toEqual(expect.arrayContaining([

			]))
		});
	});

	test('Registro con email y contraseña no válidos', async () => {

		await dao.getFilmCommentaries(wrong).then(result => {
			expect(result).toEqual(expect.arrayContaining([

			]))
		});
	});*/

});