var express = require('express'); // Incluyo el modulo de EXPRESS 

var express = require('bycryptjs'); // Libreria para encriptar la informacion del usuario

var app = express(); // Invoco a la funcion express

var Usuario = require('../models/usuario'); // Para trabajar con los usuarios

var jwt = require('jsonwebtoken'); // Libreria para JsonWebToken

var SEED = require('../config/config').SEED; // 

app.post('/', (req, res) => {

    var body = req.body;

    // Verifico si existe un usuario con ese correo

    Usuario.findOne({ email: body.email }, (err, usuarioDB) => {

        if (err) {
            return res.status(500).json({
                ok: false,
                mensaje: 'Error al buscar usuarios',
                errors: err
            });
        }

        // Verifico si existe un correo electronico valido
        if (!usuarioDB) {
            return res.status(400).json({
                ok: false,
                mensaje: 'Credenciales incorrectas - email',
                errors: err
            });
        }

        // Verifico si existe un password
        if (!bcrypt.compareSync(body.password, usuarioDB.password)) { // compareSync: compara cadenas
            return res.status(400).json({
                ok: false,
                mensaje: 'Credenciales incorrectas - password',
                errors: err
            });
        }

        // Crear un token !!! (siempre que: usuario y contraseña validos)

        usuarioDB.password = ':)'; // Para no mandar la contraseña en el token

        var token = jwt.sign({ usuario: usuarioDB }, SEED, { expiresIn: 14400 }); // Segundo termino es el SEED, tercer termino es el tiempo de validez

        res.status(200).json({
            ok: true,
            usuario: usuarioDB,
            token: token,
            id: usuarioDB._id
        });
    })
});



module.exports = app;