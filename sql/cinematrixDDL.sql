CREATE TABLE `usuarios` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nombreCompleto` varchar(45) NOT NULL,
  `username` varchar(30) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(250) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;


CREATE TABLE `actores` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nombre` varchar(30) NOT NULL,
  `apellidos` int NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;



CREATE TABLE `peliculas` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nombre` varchar(30) NOT NULL,
  `duracion` int NOT NULL,
  `puntuacion` int NOT NULL,
  `fechaEstreno` date NOT NULL,
  `sinopsis` text NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;


CREATE TABLE `usuarios_peliculas` (
   `id_usuario` int NOT NULL,
  `id_pelicula` int NOT NULL,
  `puntuacion` int DEFAULT -1,
  `favorita` tinyint(1) DEFAULT 0,
  PRIMARY KEY (`id_usuario`, `id_pelicula`),
  FOREIGN KEY (`id_usuario`) REFERENCES `usuarios` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  FOREIGN KEY (`id_pelicula`) REFERENCES `peliculas` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;


CREATE TABLE `actores_peliculas` (
  `id_actor` int NOT NULL,
  `id_pelicula` int NOT NULL,
  PRIMARY KEY (`id_actor`, `id_pelicula`),
  FOREIGN KEY (`id_actor`) REFERENCES `actores` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  FOREIGN KEY (`id_pelicula`) REFERENCES `peliculas` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;


CREATE TABLE `directores` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nombre` varchar(30) NOT NULL,
  `apellidos` int NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE `directores_peliculas` (
  `id_director` int NOT NULL,
  `id_pelicula` int NOT NULL,
  PRIMARY KEY (`id_director`, `id_pelicula`),
  FOREIGN KEY (`id_director`) REFERENCES `directores` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  FOREIGN KEY (`id_pelicula`) REFERENCES `peliculas` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE `generos` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nombre` varchar(30) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE `generos_peliculas` (
  `id_genero` int NOT NULL ,
  `id_pelicula` int NOT NULL,
  PRIMARY KEY (`id_genero`, `id_pelicula`),
  FOREIGN KEY (`id_genero`) REFERENCES `generos` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  FOREIGN KEY (`id_pelicula`) REFERENCES `peliculas` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE `comentarios` (
  `id` int NOT NULL AUTO_INCREMENT,
  `texto` text NOT NULL,
  `fecha` date NOT NULL,
  `spoiler` tinyint(1) DEFAULT 0, 
  `puntuacion` int DEFAULT 0,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE `usuarios_comentarios_peliculas` (
  `id_usuario` int NOT NULL,
  `id_pelicula` int NOT NULL,
  `id_comentario` int NOT NULL,
  PRIMARY KEY (`id_usuario`, `id_pelicula`, `id_comentario`),
  FOREIGN KEY (`id_usuario`) REFERENCES `usuarios` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  FOREIGN KEY (`id_pelicula`) REFERENCES `peliculas` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  FOREIGN KEY (`id_comentario`) REFERENCES `comentarios` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;