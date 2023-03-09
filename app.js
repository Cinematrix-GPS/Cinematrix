const express = require('express');
const app = express();
const path = require("path"); // módulo para manejar rutas

const morgan = require("morgan");  // Para depuración
app.use(morgan("dev")); //Al realizar cambios en los archivos, se reinicia la aplicacion automaticamente (Para programar)


//Configuracion base de datos

const views = require("./js/configView");

require('dotenv').config(); // Para utilizar variables de entorno desde ficheros
const PORT = process.env.PORT || 3000;

// Configuracion de las vistas y usos
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));


//Ubicacion Archivos estaticos
app.use(express.static(path.join(__dirname, "public")));


app.use(express.json());// Devuelve middleware que solo analiza json y solo mira las solicitudes donde el encabezado Content-Type coincide con la opción de tipo.
app.use(express.urlencoded({extended: true}));//Devuelve middleware que solo analiza cuerpos codificados en URL y solo mira las solicitudes donde el encabezado Content-Type coincide con la opción de tipo


// Enrutamiento

const filmRoutes = require("./routers/filmRouter");
app.use("/films", filmRoutes);

app.get("/", (request, response) => {
	response.redirect('/films/search');
});


//GESTION DE ERRORES
//Para errores de direccionamiento
app.use(function(request, response, next) { 
    response.status(404);
    response.render("error404", { 
		url: request.url });
});


//Errores de servidor
app.use(function(error, request, response, next) {
    response.status(500); 

	if (process.env.NODE_ENV === 'production'){
		response.render("error500", {
			mensaje: error.message, 
			pila: ''
		});
	}else{
		response.render("error500", {
			mensaje: error.message, 
			pila: error.stack });
	}

});

// Punto de entrada de la aplicación
app.listen(PORT, (err) => {
	if (err) {
        console.error(`No se pudo inicializar el servidor: ${err.message}`);
    } else {
		console.log(`Cinematrix está escuchando el puerto ${PORT}`);
		console.log(`BBDD ubicada en ${process.env.DB_HOST}`);
	}
});