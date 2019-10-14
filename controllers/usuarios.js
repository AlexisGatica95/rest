const express = require('express');
const router = express.Router();
const usuariosModel = require('../models/usuariosModel');
const correosModel = require('../models/correosModel');

const md5 = require('md5');//pra encriptar la pass
const uuid = require('uuid');
//uuid sirve para generar ids unicos 

router.get('/', async (req,res,next)=>{
    try {
        let user_id = req.user_id;
        let info = await usuariosModel.infoUser(user_id); //si asignamos como valor lo que devuelve una funcion asincronica, poner AWAIT antes o explota.
        res.json({info});
    } catch (error) {
        console.log(error);
    }
})

router.put('/', async (req,res,next)=>{
    try {
        let user_id = req.user_id;
        let passnueva = md5(req.body.passnueva);
        let secambio = await usuariosModel.nuevaPass(user_id, passnueva);
        if (secambio.affectedRows == 1) {
            let info = await usuariosModel.infoUser(user_id);
            let mail = info[0].mail_u;
            let subject = "Contrasena cambiada wachx";
            let html = "<h2>Tu contrasena fue cambiada exitosamente!</h2>";
            let obj = {
                mail_u : mail,
                subject : subject,
                html : html
            }
            let mandarmail = await correosModel.enviarEmail(obj);
            console.log(mandarmail);
            res.json({status: 'ok'})
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({status : 'error'})
        
    }
})

router.delete('/', (req,res,next)=>{
    try {
        
    } catch (error) {
        
    }
})

module.exports = router;