//cuando un usuario se loguea , pregunta si existe en la tabla y si lo esta devuelve un token a la tabla


//API REST : (autenticarse po TOKENS es escalable)

//les pasamos al usuario un TOKEN que lo guarda en el SESSION STORAGE / LOCAL STORAGE)

//le mandamos un TOKEN de sesion al usuario 


    //"sub": "1234567890" --- identidicador
    // "name": "John Doe" -- generalmente usaremos el id para reconocer al usuario
    //"iat": 1516239022 --cuando se genero 
  
// JWT necesito para crearlo un (header,payload,clave)


const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const fs = require('fs'); //file system (sirve para operaciones de archivos )

//POST localhost:3000/auth/login
// login -----> datos que se envian ---> auth/login

const usuariosModel = require('../models/usuariosModel');

router.post('/login', async(req,res,next) =>{
try {
    //header

    // payload

    //key se genera a travces de una clave privada .pem
    //https://travistidwell.com/jsencrypt/demo/
    //privada.pem  usamos para generar el token
     let usuario = await usuariosModel.getUser(req.body.mail_u, req.body.password_u);

     //
    if (usuario.length > 0 && usuario[0].cuenta_confirmada == 1) {
        
        var signOptions = {
            expiresIn : '2h',
            algorithm : 'RS256'
        }
        
        const privateKey = fs.readFileSync('./keys/privada.pem','utf-8');
         //fs es una libreria que me permite manipular archivos, leer ficheros
        
         const payload = {id : usuario[0].id_u, 
            nombre : usuario[0].nombre_u,
            permisos : usuario[0].permisos
            }; //como accedo al id?
            //(singsOption + payload) privatekey = token

        const usuarioInfo = {nombre : usuario[0].nombre_u};

        const token = jwt.sign(payload,privateKey,signOptions);

        res.json({usuarioInfo, jwt : token});

    } else {
        res.json({ status : 'invalid'});
    }

} catch (error) {
    res.status(500).json({status : 'error'})
}
});

module.exports = router;
