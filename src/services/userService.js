import axios from 'axios'

const API_URL = '/v1'

const getAuthHeaders = () => {
  const token = localStorage.getItem('token')
  return {
    headers: {
      'Authorization': `Bearer ${token}`,
      'Accept-Language': 'es',
      'Content-Type': 'application/json'
    }
  }
}

export const updatePassword = async (currentPassword, newPassword) => {
  const response = await axios.patch(
    `${API_URL}/client/user/password`, 
    {
      password: currentPassword,      // Campo que valida el backend como actual
      new_password: newPassword       // Campo exacto que exige el backend
    },
    getAuthHeaders()
  )
  return response.data
}