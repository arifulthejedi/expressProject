const mysql = require('mysql2/promise'); // Import the 'mysql2' library with Promises

// Create a database connection pool
const pool = mysql.createPool({
    host: 'localhost',
    user: 'ariful',
    password: 'raqib302',
    database: 'myBlogs',
    waitForConnections: true,
    connectionLimit: 100, 
    queueLimit: 0,
  });
  
  module.exports = pool;
  