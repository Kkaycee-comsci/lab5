import axios from 'axios';

const api = axios.create({
  // Ensure it has https:// and ends with /api
  baseURL: 'https://mental-health-api-fkhi.onrender.com/api', 
  headers: {
    'Content-Type': 'application/json'
  }
});

export default api;