import axios from 'axios'

const API_URL = '/v1'

const getAuthHeaders = () => {
  const token = localStorage.getItem('token')
  return {
    headers: {
      Authorization: `Bearer ${token}`,
      'Accept-Language': 'es',
      'Content-Type': 'application/json',
    },
  }
}

export const transferService = {
  // Obtener datos del usuario logueado (incluye su account_number)
  getWhoAmI: async () => {
    return await axios.get(`${API_URL}/client/user/whoami`, getAuthHeaders())
  },

  // Obtener saldo actual
  getBalance: async () => {
    return await axios.get(`${API_URL}/client/user/balance`, getAuthHeaders())
  },

  // Buscar a quién pertenece la cuenta destino
  verifyAccount: async (accountNumber) => {
    return await axios.get(`${API_URL}/client/user/account/${accountNumber}`, getAuthHeaders())
  },

  // Ejecutar transferencia
  createTransfer: async (transferData) => {
    return await axios.post(`${API_URL}/client/movement`, transferData, getAuthHeaders())
  },
}
