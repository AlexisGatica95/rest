const mysql = require('../connect');
const util = require('util');
//util permite que mysql pueda retornar una promise, osea asincronico
const query = util.promisify(mysql.query).bind(mysql);
const md5 = require('md5');

async function insertUsuario(obj) {
    try {
        const rows = await query("insert into usuarios set ?", obj);
        return rows.insertId;
    } catch (error) {
        console.log(error);
        console.log("salio por el catch del modelo");
        throw error;
    }
}

async function confirmarUsuario(codigo){
    try { 
        const confirmado = await query('update usuarios set cuenta_confirmada=1 where codigo_confirmacion = ?',codigo);
        return confirmado;
    } catch (error) {
        throw error
    }
}

module.exports = {insertUsuario,confirmarUsuario};