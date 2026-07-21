import axios from 'axios'

const API_URL = '/v1'

const getAuthHeaders = () => {
  const token = localStorage.getItem('token')

  return {
    Authorization: `Bearer ${token}`,
    'Accept-Language': 'es',
  }
}

const normalizeList = (payload) => {
  if (Array.isArray(payload)) return payload
  if (Array.isArray(payload?.data)) return payload.data
  if (Array.isArray(payload?.contacts)) return payload.contacts
  if (Array.isArray(payload?.items)) return payload.items
  return []
}

export const getContacts = async () => {
  try {
    const response = await axios.get(`${API_URL}/client/contact`, {
      headers: getAuthHeaders(),
    })

    return normalizeList(response?.data)
  } catch (error) {
    console.error('Error al obtener contactos:', error)
    throw error
  }
}

export const createContact = async (payload) => {
  try {
    const response = await axios.post(`${API_URL}/client/contact`, payload, {
      headers: getAuthHeaders(),
    })

    return response?.data?.data ?? response?.data ?? {}
  } catch (error) {
    console.error('Error al crear contacto:', error)
    throw error
  }
}
