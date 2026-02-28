import express from 'express';
import mysql from 'mysql2';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
app.use(cors()); 
app.use(express.json());

// 1. Database Connection
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',      
  password: '',      
  database: 'mental_health_db' 
});

db.connect(err => {
  if (err) console.error('Database connection failed:', err);
  else console.log('Connected to MySQL Database');
});

// 2. The Mood Endpoint
app.post('/mood', (req, res) => {
  const { full_name, mood_text } = req.body;

  const query = 'INSERT INTO mood_entries (full_name, mood_text) VALUES (?, ?)';
  db.query(query, [full_name, mood_text], (err, result) => {
    if (err) return res.status(500).json({ error: 'Database error' });

    // AI Advisor Logic
    const ai_message = `Hi ${full_name}, I've recorded your feeling of '${mood_text}' in the database. Take a deep breath!`;

    res.json({ ai_message });
  });
});

app.listen(3000, () => {
  console.log('🚀 Backend running at http://localhost:3000');
});