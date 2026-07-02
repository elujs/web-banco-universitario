import axios from 'axios';

// La URL base que vimos en la colección de Postman
const API_URL = 'http://localhost:3000/v1';

export const getMovements = async (page = 1, pageSize = 20) => {
    // 1. Buscamos el token que guardaste temporalmente para probar
    const token = localStorage.getItem('token');

    try {
        // 2. Hacemos la petición GET a la ruta exacta
        const response = await axios.get(`${API_URL}/client/movement`, {
            // 3. Enviamos los query params que pide el Postman
            params: {
                page: page,
                page_size: pageSize
            },
            // 4. Enviamos el token en las cabeceras (Headers) con la palabra "Bearer "
            headers: {
                'Authorization': `Bearer ${token}`,
                'Accept-Language': 'es'
            }
        });

        // Retornamos la respuesta completa para que tu vista la use
        return response;
        
    } catch (error) {
        console.error("Error al obtener los movimientos:", error);
        throw error;
    }
};