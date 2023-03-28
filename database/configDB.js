const mysql = require("mysql");

const connectionInfo = {
	host: process.env.DB_HOST,
	port: process.env.DB_PORT,
	user: process.env.DB_USER,
	password: process.env.DB_PASSWORD,
	database: process.env.DB_SCHEMA
};

const pool = mysql.createPool(connectionInfo);

exports.getPool = () => {
	return pool;
}

exports.connectionInfo = connectionInfo;