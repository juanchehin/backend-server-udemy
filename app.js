// *********** app.js : archivo para que inicialize el servidor EXPRESS*****************

// Requires (Importacion de librerias de tereceros)
var express = require('express');
var mongoose = require('mongoose'); // Referencia a la libreria
var bodyParser = require('body-parser'); // Importacion de la Libreria body-parser


//  Inicializar variables
var app = express(); // Defino mi servidor express


// Body Parser

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())


// Importar rutas
var appRoutes = require('./routes/app');
var usuarioRoutes = require('./routes/usuario');
var loginRoutes = require('./routes/login');

// Conexion a la base de datos
mongoose.connection.openUri('mongodb://localhost:27017/hospitalDB', (err, res) => {

    if (err) throw err; // Si existe un error, termina todo aqui

    console.log('Base de datos: \x1b[32m%s\x1b[0m', 'online');

});

// Rutas . Esto se ejecuta antes de las rutas . 'middleware'
app.use('/usuario', usuarioRoutes);
app.use('/login', loginRoutes);
app.use('/', appRoutes);

// Escuchar peticiones
app.listen(3000, () => { // function() {...
    console.log('Express server puerto 3000: \x1b[32m%s\x1b[0m', 'online');
});