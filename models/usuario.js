var mongoose = require('mongoose'); // Carga de mongoose

var uniqueValidator = require('mongoose-unique-validator');

var Schema = mongoose.Schema; // Permite cargar esquemas . Constructor de esquema

var rolesValidos = {
    values: ['ADMIN_ROLE', 'USER_ROLE'],
    message: '{VALUE} no es un rol permitido'
};


var usuarioSchema = new Schema({

    // Campos de usuario.js (creado con ROBO 3T) , son objetos JSON
    nombre: { type: String, required: [true, 'El nombre es necesario'] },
    email: { type: String, unique: true, required: [true, 'El correo es necesario'] },
    password: { type: String, required: [true, 'La contraseña es necesaria'] },
    img: { type: String, required: false },
    role: { type: String, required: true, default: 'USER_ROLE', enum: rolesValidos }

});

usuarioSchema.plugin(uniqueValidator, { message: '{PATH} debe de ser unico' });

module.exports = mongoose.model('Usuario', usuarioSchema);