const express = require('express');
const { indexRouter } = require('./routers/indexRouter');
const app = express()
const port = 3000

require('dotenv').config();

// Cualquier URL se pasará al indexRouter para saber qué hacer con ella
app.get('/', indexRouter);

// Punto de entrada de la aplicación
app.listen(port, () => {
	console.log(`Cinematrix está escuchando el puerto ${port}`);
	console.log(`BBDD ubicada en ${process.env.DB_HOST}`);
	console.log(`BBDD ubicada en ${process.env.DB_HOST}`);
});