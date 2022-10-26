const express = require('express');
const db = require('./src/database/db');
const moviesRoutes = require('./routes/movie.routes');
const cinemasRoutes = require('./routes/cinema.routes');
const indexRoutes = require('./routes/index.routes')
require('dotenv').config();

db.connectDb();

const server = express();
const PORT = process.env.PORT;


//* Para convertirlo a json en la peticion POST
server.use(express.json());
server.use(express.urlencoded({ extended: false }));

server.use('/', indexRoutes);
server.use('/movies', moviesRoutes);
server.use('/cinemas', cinemasRoutes);


//* Controlador de errores
server.use('*', (req, res) => {
    const error = new Error('Ruta no encontrada! 404 Not Found');
    error.status = 404;
    return res.status(error.status).json(error.message);
});


server.use((error, req, res, next) => {
	return res.status(error.status || 500).json(error.message || 'Unexpected error');
});


//* Iniciamos el servidor
server.listen(PORT, () => {
    console.log(`Servidor encendido http://localhost:${PORT}`);
});


