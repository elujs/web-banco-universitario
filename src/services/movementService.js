import axios from 'axios';

const API = axios.create({
    baseURL: 'http://localhost:3000'
});

// Interceptor para inyectar el token en cada petición
API.interceptors.request.use(config => {
    const token = localStorage.getItem('token');
    if (token) config.headers.Authorization = `Bearer ${token}`;
    return config;
});

export const getMovements = () => API.get('/v1/client/movement');