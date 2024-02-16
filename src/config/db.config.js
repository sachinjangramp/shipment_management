const mysql = require('mysql2');
require('dotenv').config()
const logger = require('./../utils/logger');
// console.log(process.env);
const connection = mysql.createConnection(`mysql://root:sachin@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`);

connection.connect((err) => {
  if (err) {
    logger.error('Error connecting to MySQL:' + err);
    console.error('Error connecting to MySQL:', err);
    return;
  }
  logger.info('Connected to MySQL database!');
  console.log('Connected to MySQL database!');
});



module.exports = connection;