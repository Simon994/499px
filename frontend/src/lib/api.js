import axios from 'axios'

const baseUrl = '/api'

function withHeaders(){
  return {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`
    }
  }
}

export const getProfileIndex = () => {
  return axios.get('/api/auth/profilelist/', withHeaders())
}

export function getUserProfile(){
  return axios.get('/api/auth/profile', withHeaders())
}


export const registerUser = (formData) => {
  return axios.post(`${baseUrl}/auth/register/`, formData)
}

export const loginUser = (formData) => {
  return axios.post('/api/auth/login/', formData )
}