const mongoose = require("mongoose");

const dbConection = async() => {

    try {
        await mongoose.connect( process.env.BD_CONEXION, {
            // En la documentación oficial sugiere esta configuración
            useNewUrlParser    : true,
            useUnifiedTopology : true
        });

        console.log( 'Base de datos Online' );
        
    } catch (error) {
        console.log(error);
        // Evitar que se levante la aplicación
        throw new Error('Error al iniciar la BD');
    }
}

module.exports = {
    dbConection
}

