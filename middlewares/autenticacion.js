var jwt = require('jsonwebtoken'); // Libreria para JsonWebToken

var SEED = require('../config/config').SEED; // 

// =======================================
// Verificar token
// ======================================

exports.verificaToken = function(req, res, next) {
    var token = req.query.token;

    jwt.verify(token, SEED, (err, decoded) => {

        if (err) {
            return res.status(401).json({ // 401 : No autorizado
                ok: false,
                mensaje: 'Token incorrecto',
                errors: err
            });
        }

        req.usuario = decoded.usuario;

        next();
    });

}