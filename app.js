// Requires
var express = require('express');
var mongoose = require('mongoose'); // Referencia a la libreria


//  Inicializar variables
var app = express();

// Conexion a la base de datos
mongoose.connection.openUri('mongodb://localhost:27017/hospitalDB', (err, res) => {

    if (err) throw err; // Si existe un error, termina todo aqui

    console.log('Base de datos: \x1b[32m%s\x1b[0m', 'online');

});

// Rutas
app.get('/', (req, res, next) => {

    res.status(404).json({
        ok: true,
        mensaje: 'Peticion realizada correctamente'
    })

})


// Escuchar peticiones
app.listen(3000, () => {
    console.log('Express server puerto 3000: \x1b[32m%s\x1b[0m', 'online');
});