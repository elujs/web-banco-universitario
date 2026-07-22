import axios from 'axios';

const API_URL = 'http://localhost:3000/v1';

// Función para obtener el token desde el localStorage
const getAuthHeaders = () => {
    const token = localStorage.getItem('token');
    return {
        headers: {
            'Authorization': `Bearer ${token}`,
            'Accept-Language': 'es',
            'Content-Type': 'application/json'
        }
    };
};

// Servicio para cambiar contraseña
export const updatePassword = async (currentPassword, newPassword) => {
    return await axios.patch(
        `${API_URL}/client/user/password`, 
        {
            password: currentPassword,
            new_password: newPassword
        },
        getAuthHeaders() // Enviamos el token automáticamente
    );
};

// Puedes añadir aquí otras funciones de usuario que necesites después
export const getUserProfile = async () => {
    return await axios.get(`${API_URL}/client/user/whoami`, getAuthHeaders());
};