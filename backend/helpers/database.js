const mariadb = require('mariadb');
const pool = mariadb.createPool({
    host: process.env.HOST,
    user: process.env.USER,
    password: process.env.PASSWORDDB,
    database: process.env.DATABASE,
    port: process.env.PORTDB,
    connectionLimit: 5
});

//connect and check for errors
pool.getConnection((err, connection) => {
    if(err){
        if(err.code === 'PROTOCOL_CONNECTION_LOST'){
            console.error('Database connection lost');
        }
        if(err.code === 'ER_CON_COUNT_ERROR'){
            console.error('Database has too many connections');
        }
        if(err.code === 'ECONNREFUSED'){
            console.error('Database connection was refused');
        }
    }
    if(connection) connection.release();

    return;
})

module.exports = pool;