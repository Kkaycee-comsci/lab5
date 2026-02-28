const mysql = require('mysql2'); // or 'mysql'
const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

// 🟢 FIX: Use the MYSQL_URL variable from Railway
const db = mysql.createConnection(process.env.MYSQL_URL || {
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'railway'
});

db.connect((err) => {
    if (err) {
        console.error('❌ Database connection failed:', err);
        return;
    }
    console.log('✅ Connected to MySQL Database on Railway!');
});

// ... the rest of your routes (app.post, app.get) ...

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`🚀 Backend running on port ${PORT}`);
});