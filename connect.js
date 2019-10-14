//siempre fuera de public!!!. .env
const mysql = require('mysql'); //mysql hace referencia al modulo instalado
const util = require('util');


const pool = mysql.createPool({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: '',
    database: 'carrito',
    connectionLimit: 10
});

// pool.getConection((error, connection) => {
//     if (error) { console.log(error); }
//     else { return connection; }
// });

pool.getConnection((err, connection) => {
    if(err) throw err;
    return connection;
});

module.exports = pool;