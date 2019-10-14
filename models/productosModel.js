const mysql = require('../connect');
const util = require('util');
//util permite que mysql pueda retornar una promise, osea asincronico
const query = util.promisify(mysql.query).bind(mysql);
// bind ----> this. ahre
// el bloque try catch es propio en node de funciones asincronicas
async function getProductos() {
    //se realiza una consulta de todos los productos de la tabla
    try {
        let rows = await query("SELECT * from productos");
        //rows : array de objetos
        return rows;
    } catch (error) {
        //bloque en caso de que exista un error
        console.log(error);
    }
};

async function getProducto(id) {
    try {
        const rows = await query("SELECT * from productos where id_p= ?", id);
        return rows;
    } catch (error) {
        //bloque en caso de que exista un error
        console.log(error);
    }
};

async function getProductosPrecio(min, max) {
    try {
        const rows = await query("select * from productos where precio_p >= ? and precio_p <= ?", [min, max]);
        console.log(min + 'model' + max);
        return rows;
    } catch (err) {
        console.log(err);
    }
}

async function insertProducto(obj) {
    try {
        const rows = await query ("insert into productos set ?", obj);
        return rows.insertId;
        //insertId es una propiedad que nos devuelve el primary AI con el que se inserto el ultimo producto de esta peticion
    } catch (err) {
        console.log('entro al catch del model');
        console.log(err);
        throw err;
    }
}

async function borrarProducto(id){
    try {
        let rows = await query("delete from productos where id_p = ?", id);
        return rows;
    } catch (error) {
        console.log(error);
    }
}

async function modificarProducto(id,obj){
    try {
        const rows = await query("update productos set ? where id_p = ?", [obj,id]);
        return rows;
    } catch (error) {
        console.log('entro al catch del model');
        console.log(error);
        throw error;
    }
}

module.exports = {getProductos, getProducto, getProductosPrecio, insertProducto, borrarProducto, modificarProducto};