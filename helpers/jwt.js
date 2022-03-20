const express = require('express');
const jwt = require('jsonwebtoken')

const generarJWT = ( uid, name ) =>{

    const payload = { uid, name };

    // Regresamos una promesa porque FH es medio nena
    return new Promise( ( resolve, reject ) =>{

        // El primer parametro payload es la información que se va a grabar en el jwt
        // El segundo es la clave secreta que nadie debe de conocer
        // las opciones son para definir la expiración del jwt, entre otras
        jwt.sign( payload, process.env.SECRET_JWT_SEED, {
            expiresIn: '24h'
        }, (err, token) => {
            if ( err ){
                // Si hubo algun error
                console.log(err);
                reject ( err )
            }else{
                // Si todo salió bien
                resolve( token );
            }
        });
    });
}

module.exports = {
    generarJWT
}

