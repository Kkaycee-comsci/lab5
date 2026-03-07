import axios from 'axios';

const api = axios.create({
  // 👇 REPLACE THIS URL with your actual Render URL
  baseURL: 'https://mental-health-api-fkhi.onrender.com', 
  headers: {
    'Content-Type': 'application/json'
  }
});

export default api;