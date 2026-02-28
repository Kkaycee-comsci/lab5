import express from 'express';
import mysql from 'mysql2';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
app.use(cors()); 
app.use(express.json());

// 1. FIXED Database Connection for Cloud
// This tells the app: "Use the Railway URL if available, otherwise use localhost"
// This forces the app to use the Render Environment Variable first
const db = mysql.createConnection(process.env.MYSQL_URL || {
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'mental_health_db' 
});
db.connect(err => {
  if (err) {
    console.error('❌ Database connection failed:', err);
  } else {
    console.log('✅ Connected to MySQL Database!');
  }
});

// 2. The Mood Endpoint (Same as before)
app.post('/api/mood', (req, res) => { // Added /api/ to match your frontend baseURL
  const { full_name, mood_text } = req.body;
  const query = 'INSERT INTO mood_entries (full_name, mood_text) VALUES (?, ?)';
  
  db.query(query, [full_name, mood_text], (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: 'Database error' });
    }
    const ai_message = `Hi ${full_name}, I've recorded your feeling of '${mood_text}'. Take a deep breath!`;
    res.json({ ai_message });
  });
});

// 3. FIXED Port for Railway
const PORT = process.env.PORT || 3000; 
app.listen(PORT, () => {
  console.log(`🚀 Backend running on port ${PORT}`);
});