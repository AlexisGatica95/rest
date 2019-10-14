const express = require('express');
const router = express.Router();
const usuariosModel = require('../models/usuariosModel');

const md5 = require('md5');//pra encriptar la pass
const uuid = require('uuid');
//uuid sirve para generar ids unicos 
const registroModel = require('../models/registroModel');
const correosModel = require('../models/correosModel'); 

//con ":" pongo como var todo lo que esta despues de la barra
router.get('/:codigo', async(req,res,next) =>{
    try {
        let codigo = req.params.codigo;
        let u_confirmado = registroModel.confirmarUsuario(codigo);
        res.json({status: 'ok', confirmado : u_confirmado});
    } catch (error) {
        res.status(500).json({status: 'error'});
    }
})

router.post('/', async(req,res,next)=> {
    try {
        let obj = {
            mail_u: req.body.mail_u,
            //md5 es una funcion NO reversible para encriptar cadaena de caracteres
            password_u: md5(req.body.password_u),
            //
            nombre_u: req.body.nombre_u,
            apellido_u: req.body.apellido_u,
            //uuid genera un strig aleatorio

            codigo_confirmacion: uuid()            
        };

        let objMailConfig = {
            nombre_u: obj.nombre_u,
            mail_u:obj.mail_u,
            suject:'confitma cuenta',
            html:'para registrarse ingresar a : localhost:3000/registro/ '+obj.codigo_confirmacion
        };

        let usuarios_insert = await registroModel.insertUsuario(obj);
        if (usuarios_insert != undefined) {

            let email_sent = await correosModel.enviarEmail(objMailConfig);

            res.json({status: 'ok', id: usuarios_insert});
        }
    } catch (error) {
       
        console.log(error);
        res.status(500).json({status: 'error'});
    }
});

module.exports = router;