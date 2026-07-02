import axios from 'axios';

const API_URL = 'http://localhost:3000/v1';

// Ahora aceptamos un tercer parámetro: "filters" (un objeto vacío por defecto)
export const getMovements = async (page = 1, pageSize = 20, filters = {}) => {
    const token = localStorage.getItem('token');

    // 1. Preparamos los parámetros base que siempre deben ir
    const queryParams = {
        page: page,
        page_size: pageSize
    };

    // 2. Si el usuario seleccionó algún filtro, se lo agregamos a la petición
    if (filters.multiplier) queryParams.multiplier = filters.multiplier;
    if (filters.fromDate) queryParams.from_date = filters.fromDate;
    if (filters.toDate) queryParams.to_date = filters.toDate;

    try {
        const response = await axios.get(`${API_URL}/client/movement`, {
            params: queryParams, // Axios armará la URL automáticamente con esto
            headers: {
                'Authorization': `Bearer ${token}`,
                'Accept-Language': 'es'
            }
        });
        
        return response;
        
    } catch (error) {
        console.error("Error al obtener los movimientos:", error);
        throw error;
    }
};