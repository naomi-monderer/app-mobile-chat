const mysql = require('mysql');

var connection;
try {
  connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'chat',
    port: '8889',
  });
} catch (err) {
  console.error('Failed to connect using port 8889:', err);
  console.log('Attempting to connect using port 3306...');
  connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'chat',
    port: '3306',
  });
}

connection.connect(function(err) {
  if (err) {
    console.error('Error connecting to database:', err);
    return;
  }
  console.log(`Connected to database on port ${connection.config.port}!`);

});



module.exports = connection