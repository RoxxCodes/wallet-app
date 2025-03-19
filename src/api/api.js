import axios from 'axios';

const backendPort = process.env.BACKEND_SERVER_PORT || 5000; // Default to 5000 if not set
const backendDomain = window.location.hostname; // Gets current domain

const API_BASE_URL = `${window.location.protocol}//${backendDomain}:${backendPort}/api/v1`;

const api = axios.create({
  baseURL: API_BASE_URL,
});

export default api;