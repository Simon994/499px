import axios from 'axios'

const baseUrl = '/api'

export const registerUser = (formData) => {
  return axios.post(`${baseUrl}/auth/register/`, formData)
}