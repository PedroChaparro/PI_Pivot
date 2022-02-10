const mysql = require('mysql'); 
const { promisify } = require('util'); 
require('dotenv').config();

const pool = mysql.createPool({
    host: process.env.DB_HOST, 
    user: process.env.DB_USER, 
    password: process.env.DB_PASSWORD, 
    port: process.env.DB_PORT, 
    database: process.env.DB_DATABASE
});

pool.getConnection((err, connection) => {
    if (err) {
        if (err.code === 'PROTOCOL_CONNECTION_LOST') {
            console.error('DATABASE CONECCTION WAS CLOSED');
        }
        if (err.code === 'ER_CON_COUNT_ERROR') {
            console.error('DATABASE HAS TO MANY CONNECTIONS');
        }
        if (err.code === 'ECONNREFUSED') {
            console.error('DATABASE CONNECTION WAS REFUSED');
        }
    }
    if(connection) connection.release();
    console.log('DB is connected');
    return;
});

pool.query = promisify(pool.query); //allows promisify
module.exports = pool;