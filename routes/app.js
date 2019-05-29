var express = require('express');

var app = express();

/*
    +app es una instancia de express.
    +METHOD (GET o POST) es un método de solicitud HTTP.
    +PATH ('/') es una vía de acceso en el servidor.
    +HANDLER ( (req, res, next) ) es la función que se ejecuta cuando se correlaciona la ruta.

*/

app.get('/', (req, res, next) => { // Funcion middleware

    res.status(200).json({
        ok: true,
        mensaje: 'Peticion realizada correctamente'
    });

});

module.exports = app;