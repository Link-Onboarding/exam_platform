let mysql = require('mysql');

require('dotenv').config();

const db_config = {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME
};

let database;

function handleDisconnect() {
    database = mysql.createConnection(db_config);

    database.connect(function(err) {
        if(err) {
            console.log('error when connecting to db:', err);
            setTimeout(handleDisconnect, 2000);
        }
        else {
            console.log('Successfully connected to the database!');
        }
    });

    database.on('error', function(err) {
        console.log('db error', err);
        if(err.code === 'PROTOCOL_CONNECTION_LOST') {
            handleDisconnect();
        } else {
            throw err;
        }
    });
}

exports.setupDatabaseConnection = function setupDatabaseConnection() {
    handleDisconnect();
};

exports.Query = async function Query(sqlCommand) {
    return new Promise((resolve, reject) => {
        database.connect(function() {
            database.query(sqlCommand,(err, result) => {
                return err ? reject(err) : resolve(result);
            });
        });
    });
};

exports.Execute = function Execute(sqlCommand) {
    return new Promise((resolve, reject) => {
        database.connect(function() {
            database.query(sqlCommand,(err, result) => {
                return err ? reject(err) : resolve(result);
            });
        });
    });
};