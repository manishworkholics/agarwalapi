const mysql = require('mysql2');


const dbConnection = mysql.createConnection({
  host: '62.72.28.103',        
  user: process.env.DB_USER || 'u551930549_userss',
  password: process.env.DB_PASS || 'Pnwqk$S7w/P',
  database: process.env.DB_NAME || 'u551930549_agarwaldb'
});

dbConnection.connect((err) => {
  if (err) {
    console.error('Error connecting to the database:', err);
    return;
  }
  console.log('Connected to the MySQL Database');
});

module.exports = dbConnection;
