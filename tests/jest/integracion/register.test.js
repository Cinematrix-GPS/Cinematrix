"use strict"

require('dotenv').config();

const { getPool } = require('../../../database/configDB');

const UserDAO = require('../../../js/daos/userDAO');

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
		
	});

	afterAll(async () => {
		await dao.query("DELETE FROM usuarios WHERE id > 0;");
        await dao.query("DROP TABLE usuarios;");
		await pool.end();
	});

	test('Registro con email y contraseña válidos', async () => {

		const correct = {
			nombreCompl: 'Jaime Cano',
			username: 'jaimeca',
			correo: 'jaimeca@gmail.com',
			pass: 'aBcDeF1*',
		}

		await dao.createUser(correct).then(result => {
			expect(result).toEqual(expect.objectContaining({ affectedRows: 1 }));
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