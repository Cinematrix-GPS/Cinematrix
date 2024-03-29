const express = require('express');
const app = express();
const path = require("path"); // módulo para manejar rutas

const morgan = require("morgan");  // Para depuración
app.use(morgan("dev")); //Al realizar cambios en los archivos, se reinicia la aplicacion automaticamente (Para programar)

require('dotenv').config(); // Para utilizar variables de entorno desde ficheros
const PORT = process.env.PORT || 3000;

// Configuracion de las vistas y usos
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));


//Ubicacion Archivos estaticos
app.use(express.static(path.join(__dirname, "public")));


app.use(express.json());// Devuelve middleware que solo analiza json y solo mira las solicitudes donde el encabezado Content-Type coincide con la opción de tipo.
app.use(express.urlencoded({extended: true}));//Devuelve middleware que solo analiza cuerpos codificados en URL y solo mira las solicitudes donde el encabezado Content-Type coincide con la opción de tipo

// Configuración de las sesiones
const session = require('express-session');
const MySQLStore = require('express-mysql-session')(session);

const pool = require('./database/configDB').connectionInfo; // Para obtener los datos de conexión a la BBDD
const sessionStore = new MySQLStore(pool);

app.use(session({
	key: 'login_cookie',
	secret: '7587631bc33f9454e32112c1eaeb21be',
	store: sessionStore,
	resave: true,
	saveUninitialized: true
}));

app.use(function(request, response, next) {
    console.log("Usuario logeado: " + request.session.mail+" "+ request.session.username+" id: "+request.session.idUser);
    next();
})

// Enrutamiento

const filmRoutes = require("./routers/filmRouter");
app.use("/films", filmRoutes);

const userRoutes = require("./routers/userRouter");
app.use("/users", userRoutes);

app.get("/", (request, response) => {
	response.redirect('/films/start');
	
});


app.get("/registro", (request, response) => {
	response.render("registro", {  
		title: "REGISTRO inicio",
		fallo: "" 
		
	});
	
});

app.get("/login", (request, response) => {
	response.render("login", {  
		title: "Login",
		fallo: "",
		username: 0
	});
	
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