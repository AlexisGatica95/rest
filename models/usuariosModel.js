const mysql = require('../connect');
const util = require('util');
//util permite que mysql pueda retornar una promise, osea asincronico
const query = util.promisify(mysql.query).bind(mysql);
const md5 = require('md5');

async function getUser(user,password) {
    try {
        const rows = await query('select id_u, nombre_u , cuenta_confirmada, permisos from usuarios where mail_u = ? and password_u = ?',[user,md5(password)]);
        return rows; 
    } catch (error) {
        
    }
    
}

async function infoUser(id) {
    const rows = await query('select * from usuarios where id_u = ?', id);
    return rows;
};

function usuariosFn(user) {
    let nombre = user.nombre;
    console.log('el modelo funciona');
    return {status: 'ok', nombre: nombre};
};

async function getUserAdmin(user,password) {
    try {
        const rows = await query('select id_u, nombre_u , cuenta_confirmada from usuarios where mail_u = ? and password_u = ? and permisos = 1',[user,md5(password)]);
        return rows; 
    } catch (error) {
        throw error;
    }
    
};

async function nuevaPass(id, nuevapass) {
    try {
        console.log('llego a la funcion');
        const rows = await query('update usuarios set password_u = ? where id_u = ?',[nuevapass,id]);
        console.log(rows.affectedRows);
        return rows; // cuando hacemos un update la query devuelve un BOOLEANO, true si lo logro o false si no.
    } catch (error) {
        console.log('error en el modelo');
        throw error;
    }
}

module.exports = {usuariosFn,getUser,getUserAdmin, infoUser,nuevaPass};