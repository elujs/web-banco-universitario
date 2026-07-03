import axios from 'axios';

const API_URL = 'http://localhost:3000/v1';

export const getMovements = async (page = 1, pageSize = 20, filters = {}) => {
    const token = localStorage.getItem('token');

    const queryParams = {
        page: page,
        page_size: pageSize
    };

    if (filters.multiplier) {
        queryParams.multiplier = filters.multiplier;
    }
    
    // Aquí está la magia de las fechas:
    if (filters.fromDate) {
        // Le agregamos la hora cero para que abarque desde el primer segundo del día
        queryParams.from_date = `${filters.fromDate}T00:00:00Z`;
    }
    
    if (filters.toDate) {
        // Le agregamos la última hora para que abarque hasta el último segundo del día
        queryParams.to_date = `${filters.toDate}T23:59:59Z`;
    }

    try {
        const response = await axios.get(`${API_URL}/client/movement`, {
            params: queryParams, 
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