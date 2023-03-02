const express = require('express');
const app = express();
const path = require("path");// modulo para manejar rutas

const morgan = require("morgan");  //Para depuracion

const livereload = require("livereload");
const connectLivereload = require("connect-livereload");
// open livereload high port and start to watch public directory for changes
const liveReloadServer = livereload.createServer();

//Configuracion base de datos
const config = require("./js/config");//Configuracion bbd y puerto
const PORT = process.env.PORT || config.puerto;
require('dotenv').config();

//Configuracion de las vistas y usos
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.static(__dirname + '/public'));
app.use(connectLivereload());
//Ubicacion Archivos estaticos
app.use(express.static(path.join(__dirname, "public")));
app.use(express.json());//Devuelve middleware que solo analiza json y solo mira las solicitudes donde el encabezado Content-Type coincide con la opción de tipo.
app.use(express.urlencoded({extended: true}));//Devuelve middleware que solo analiza cuerpos codificados en URL y solo mira las solicitudes donde el encabezado Content-Type coincide con la opción de tipo
app.use(morgan("dev"));//Al realizar cambios en los archivos, se reinicia la aplicacion automaticamente (Para programar)

app.use(express.static(path.join(__dirname, "public")));
liveReloadServer.watch(path.join(__dirname, "public"), path.join(__dirname, "views"));
//Enrutamiento

const filmRoutes = require("./routers/filmRouter");
app.use("/film", filmRoutes);

app.get("/", (request, response) => {
    response.status(200);
    response.render("index", {  
            title: "Prototipo Cinematrix",
            films: ""});
    }

);


// ping browser on Express boot, once browser has reconnected and handshaken
liveReloadServer.server.once("connection", () => {
    console.log("Refrescando browser");
    setTimeout(() => {
    liveReloadServer.refresh("/");
    }, 100);
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
    response.render("error500", {
        mensaje: error.message, 
        pila: error.stack });
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