import axios from 'axios';

// This is the bridge between your website and your cloud server
const API = axios.create({
    // Make sure this matches the link Railway gave you!
    baseURL: 'https://lab5-production.up.railway.app/api' 
});

export default API;