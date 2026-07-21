import axios from 'axios'

const API_URL = '/v1'
const CONTACTS_ENDPOINT = `${API_URL}/client/contact`

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

export const getContacts = async (page = 1, pageSize = 20) => {
  try {
    const response = await axios.get(CONTACTS_ENDPOINT, {
      params: {
        page,
        page_size: pageSize,
      },
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
    const response = await axios.post(CONTACTS_ENDPOINT, payload, {
      headers: getAuthHeaders(),
    })

    return response?.data?.data ?? response?.data ?? {}
  } catch (error) {
    console.error('Error al crear contacto:', error)
    throw error
  }
}

const normalizeContactDetail = (payload) => {
  const detail = payload?.data ?? payload

  if (detail?.user && typeof detail.user === 'object') {
    return detail.user
  }

  return detail ?? {}
}

export const getContactById = async (id) => {
  try {
    const response = await axios.get(`${CONTACTS_ENDPOINT}/${id}`, {
      headers: getAuthHeaders(),
    })

    return normalizeContactDetail(response?.data ?? {})
  } catch (error) {
    console.error('Error al obtener el contacto por ID:', error)
    throw error
  }
}

export const updateContact = async (id, payload) => {
  try {
    const response = await axios.put(`${CONTACTS_ENDPOINT}/${id}`, payload, {
      headers: getAuthHeaders(),
    })

    return response?.data?.data ?? response?.data ?? {}
  } catch (error) {
    console.error('Error al actualizar el contacto:', error)
    throw error
  }
}
