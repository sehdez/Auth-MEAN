const { Router } = require ('express');
const { check } = require('express-validator');
const { crearUsuario, login, renew } = require('../controllers/auth');
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');

const router = Router();

router.post('/new' , [
    check( 'name', 'El name es obligatorio' ).not().isEmpty(),
    check( 'email', 'El email es obligatorio' ).not().isEmpty(),
    check( 'email', 'El email debe de ser de formato válido' ).isEmail(),
    check( 'password', 'El password es obligatorio' ).not().isEmpty(),
    check( 'password', 'El password debe contener al menos 6 digitos' ).isLength({ min: 6 }),
    validarCampos
] , crearUsuario);

router.post( '/', [
    check( 'email', 'El email es obligatorio' ).not().isEmpty(),
    check( 'email', 'El email debe de ser de formato válido' ).isEmail(),
    check( 'password', 'El password es obligatorio' ).not().isEmpty(),
    check( 'password', 'El password debe contener al menos 6 digitos' ).isLength({ min: 6 }),
    validarCampos
] ,login );

router.get( '/renew', validarJWT , renew );

module.exports = router;

