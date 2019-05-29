var express = require('express'); // Incluyo el modulo de EXPRESS 

var express = require('bycryptjs'); // Libreria para encriptar la informacion del usuario

var app = express(); // Invoco a la funcion express

var Usuario = require('../models/usuario');

var jwt = require('jsonwebtoken'); // Libreria para JsonWebToken

var mdAutenticacion = require('../middlewares/autenticacion');

//var SEED = require('../config/config').SEED; // 

// =======================================
// Obtener todos los usuarios
// ======================================

app.get('/', (req, res, next) => {

    Usuario.find({}, 'nombre email img role')
        .exec(
            (err, usuarios) => { // Busca todo

                if (err) {
                    return res.status(500).json({
                        ok: false,
                        mensaje: 'Error cargando usuario',
                        errors: err
                    });
                }

                res.status(200).json({
                    ok: true,
                    usuarios: usuarios
                });

            });
});



// =======================================
// Actualizar usuario
// ======================================

app.put('/:id', mdAutenticacion.verificaToken, (req, res) => { // podria usar tambien app.patch

    var id = req.params.id;

    var body = req.body; // Convencion de poner al principio, solo se usara para el caso de que no haya errores 

    Usuario.findById(id, (err, usuario) => { // findById : Funcion de mongoose
        // CallBack
        if (err) {
            return res.status(500).json({
                ok: false,
                mensaje: 'Error al buscar usuario',
                errors: err
            });
        }

        if (!usuario) { // Verifica si no es un usuario
            return res.status(400).json({
                ok: false,
                mensaje: 'El usuario con el id' + id + 'no existe',
                errors: { message: 'No existe un usuario con ese ID' }
            });
        }

        // Ahora si, actualizamos de la data (si llego hasta aqui es por que salto los 'if' anteriores)

        usuario.nombre = body.nombre;
        usuario.email = body.email;
        usuario.role = body.role;

        // Grabacion de la data

        usuario.save((err, usuarioGuardado) => {
            if (err) {
                return res.status(400).json({
                    ok: false,
                    mensaje: 'Error al actualizar usuario',
                    errors: err
                });
            }

            usuarioGuardado.password = ':)';

            // Muestro el usuario actualizado

            res.status(200).json({
                ok: true,
                usuario: usuariosGuardado
                    // mensaje: 'Usuario actualizado correctamente'
            });
        });
    });
});

// =======================================
// Crear un nuevo usuario
// ======================================

app.post('/', mdAutenticacion.verificaToken, (req, res) => {

    var body = req.body;

    var usuario = new Usuario({
        nombre: body.nombre,
        email: body.email,
        password: bcrypt.hashSync(body.password, 10), // Para incriptar la contraseña
        img: body.img,
        role: body.role
    });

    usuario.save((err, usuarioGuardado) => {

        if (err) {
            return res.status(400).json({
                ok: false,
                mensaje: 'Error al crear usuario',
                errors: err
            });
        }

        res.status(201).json({
            ok: true,
            usuario: usuariosGuardado,
            usuarioToken: req.usuario // Ver autenticacion.js
        });

    });

})

// =======================================
// Borrar un usuario por el id
// ======================================

app.delete('/:id', mdAutenticacion.verificaToken, (req, res) => {

    var id = req.params.id;

    Usuario.findByIdAndRemove(id, (err, usuarioBorrado) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                mensaje: 'Error al borrar usuario',
                errors: err
            });
        }

        // Funcion para saber si viene un usuario valido

        if (!usuarioBorrado) {
            return res.status(400).json({
                ok: false,
                mensaje: 'No existe un usuario con ese id',
                errors: { message: 'No existe ningun usuario con ese id' }
            });
        }

        res.status(200).json({
            ok: true,
            usuario: usuarioBorrado
        });

    });
});

module.exports = app;