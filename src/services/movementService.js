import axios from 'axios'

const API_URL = '/v1'

export const getMovements = async (page = 1, pageSize = 20, filters = {}) => {
  const token = localStorage.getItem('token')

  // 1. Preparamos solo los parámetros que el backend sí procesa
  const queryParams = {
    page: page,
    page_size: pageSize,
  }

  // 2. Si el backend sí procesa el multiplicador (tipo), lo dejamos
  if (filters.multiplier) {
    queryParams.multiplier = filters.multiplier
  }

  try {
    const response = await axios.get(`${API_URL}/client/movement`, {
      params: queryParams,
      headers: {
        Authorization: `Bearer ${token}`,
        'Accept-Language': 'es',
      },
    })

    return response
  } catch (error) {
    console.error('Error al obtener los movimientos:', error)
    throw error
  }
}
