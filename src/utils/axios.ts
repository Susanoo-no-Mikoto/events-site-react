import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://json-server-events-site.onrender.com',
});

export default instance;
