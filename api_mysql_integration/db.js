import mysql from "mysql2/promise";

// Hardcoded for XAMPP defaults to ensure it works right now
export const db = await mysql.createPool({
  host: "127.0.0.1",
  user: "root",
  password: "", 
  database: "mood_tracker_db",
  port: 3306
});

console.log("Database pool created with user: root");