'use strict'

module.exports ={
   
    createUser : `INSERT INTO usuarios (nombreCompleto, username, email, password) 
                VALUES (?, ?, ?, ?);`,

    existeUsername: `SELECT username
                        FROM usuarios WHERE username=?;`,
    
    existeMail: `SELECT email
                    FROM usuarios WHERE email=?;`,

	readUser:	`SELECT id, email, password, username, nombreCompleto
				 FROM usuarios
				 WHERE email = ?`
};