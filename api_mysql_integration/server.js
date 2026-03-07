import express from 'express';
import mysql from 'mysql2';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const app = express();

// 1. IMPROVED CORS SETTINGS (Moved to the top)
app.use(cors({
  origin: '*',
  methods: ['GET', 'POST'],
  allowedHeaders: ['Content-Type']
})); 

app.use(express.json());

// 2. Database Connection
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

// 3. The Mood Endpoint
app.post('/api/mood', (req, res) => {
  const { full_name, mood_text } = req.body;
  const query = 'INSERT INTO mood_entries (full_name, mood_text) VALUES (?, ?)';
  
  db.query(query, [full_name, mood_text], (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: 'Database error', details: err.message });
    }
    const ai_message = `Hi ${full_name}, I've recorded your feeling of '${mood_text}'. Take a deep breath!`;
    res.json({ ai_message });
  });
});

// 4. Port Configuration
const PORT = process.env.PORT || 3000; 
app.listen(PORT, () => {
  console.log(`🚀 Backend running on port ${PORT}`);
});