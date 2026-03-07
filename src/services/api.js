import axios from 'axios';

const api = axios.create({
  // Just the base URL
  baseURL: 'https://mental-health-api-fkhi.onrender.com', 
  headers: {
    'Content-Type': 'application/json'
  }
});

export default api;