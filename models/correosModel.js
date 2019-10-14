//este archivo envia correos

const nodemailer = require ('nodemailer');//libreria de nodemailer

async function enviarEmail(obj) {
   
    try {
        var user_mail = 'alexisgatica95@gmail.com';
        var user_pass = 'Avefenix333';

        let transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',//cada proveedor de los correos tiene lçsu porpio host de correos
        port: 587,

        secure: false, 
        auth: {
            user: user_mail, //
            pass: user_pass //
        },
        tls : {
            rejectUnauthoruzed : false // no tengo certificadp de seguridad //
        }
    });

   
    let info = await transporter.sendMail({
        from: user_mail, // sender address
        to: obj.mail_u,
        subject: obj.subject,
        html: obj.html
    });

    console.log('Message sent: %s', info.messageId);
    return info.messageId;
        
    } catch (error) {
        throw error;
        
    }
    
}

module.exports = {enviarEmail}