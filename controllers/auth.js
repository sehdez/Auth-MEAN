const { response } = require('express');
const Usuario = require('../models/Usuario');
const bcrypt = require('bcryptjs');
const { generarJWT } = require('../helpers/jwt')

// Crear Usuario
const crearUsuario = async(req, res = response ) =>{
    const { email, name, password } = req.body;

    try {
        // Verificar el email //se sustituye (email: email) por email
        const usuario = await Usuario.findOne({ email });
        if ( usuario ){
            return res.status( 400 ).json({
                ok : false,
                msg: 'El usuario ya existe con ese email' 
            });
        }
        // Crear usuario con el modelo
        const dbUsuario = new Usuario( req.body );

        // Hashear la contraseña
        const salt = bcrypt.genSaltSync();
        dbUsuario.password = bcrypt.hashSync( password, salt );

        // Generar JWT
        const token = await generarJWT( dbUsuario.id, name );

        // Crear usuario en BD
        dbUsuario.save();
        // Generar respuesta exitosa
        return res.status(201).json({
            ok  : true,
            uid : dbUsuario.id,
            name,
            token
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok : false,
            msg: 'Comuniquese con el Administrador'
        })        
    }

    

}

// Login de Usuario
const login = async(req, res = response) =>{
    const { email, password } = req.body;
    try {

        const dbUsuario = await Usuario.findOne({ email });
        if ( !dbUsuario ){
            return res.status(400).json({
                ok: false,
                msg: 'No se encontró el correo en la base de datos'
            })
        }
        // Confirmar si el password hace match
        const validPassword = bcrypt.compareSync( password, dbUsuario.password );
        if (!validPassword){
            return res.status(400).json({
                ok: false,
                msg: 'La contraseña no es correcta'
            });
        }
    
        // Generar JWT
        const token = await generarJWT( dbUsuario.id, dbUsuario.name );
        
        // Respuesta del servicio
        return res.json({
            ok: true,
            uid: dbUsuario.id,
            name: dbUsuario.name,
            token
        })

    } catch (error) {
        console.log( error );
        return res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        })
    }

}

// Renovar Token
const renew = async(req, res = response) =>{

    const { uid, name } = req;
    const token = await generarJWT( uid, name );
    
    res.json({
        ok : true,
        uid,
        name,
        token

    })
}



module.exports = {
    crearUsuario,
    renew,
    login
}