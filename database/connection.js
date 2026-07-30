const mongoose = require('mongoose');

const connection = async() => {
    try {
        await mongoose.connect('mongodb://127.0.0.1:27017/bd_red_social');

        console.log('Conectado correctamente a la BD de red social');
    } catch (error) {
        console.error(error);
        throw new Error('No se ha podido conectar a la base de datos')
    }
}

module.exports = connection


