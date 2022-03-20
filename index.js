//Importar Express
const express = require('express');
const cors    = require('cors');
const { dbConection } = require('./db/config');
require ('dotenv').config();

//Crear servidor
const app = express();

// Base de datos
dbConection();

//Cors
app.use( cors() );

//Carpeta public
app.use( express.static('public') );

//Lectura y parseo del Body
app.use( express.json() );

//Middleware
app.use('/api/auth', require('./routes/auth'));

//Levantar la app de express
app.listen( process.env.PORT , () => {
    console.log(`Servidor corriendo en el puerto ${ process.env.PORT }` );
})
