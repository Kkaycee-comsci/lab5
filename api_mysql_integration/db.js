const mysql = require('mysql2');

// This uses the Cloud URL from Railway/Render, or defaults to local for your PC
const connection = mysql.createConnection(process.env.MYSQL_URL || {
    host: 'localhost',
    user: 'root',
    password: 'your_local_password',
    database: 'mental_health_db'
});

connection.connect(err => {
    if (err) {
        console.error('❌ Database connection failed:', err.stack);
        return;
    }
    console.log('✅ Connected to the database!');
});

module.exports = connection;