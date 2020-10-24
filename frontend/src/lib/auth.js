
export function setToken(token){
  localStorage.setItem('token', token)
}

export const getToken = () =>{
  return localStorage.getItem('token')
}

export const setIsGettingToKnow = () => {
  localStorage.setItem('isGettingToKnow', true)
}

export const getIsGettingToKnow = () =>{
  return localStorage.getItem('isGettingToKnow')
}

export const gottenToKnow = () => {
  localStorage.removeItem('isGettingToKnow')
}

export const logout = () => {
  localStorage.removeItem('token')
  localStorage.removeItem('avatar')
}

const getPayload = () => {
  const token = getToken()
  if (!token) return false
  const parts = token.split('.')
  if (parts.length < 3) return false
  
  return JSON.parse(atob(parts[1]))
}

export const isAuthenticated = () => {
  const payload = getPayload()
  if (!payload) return false
  const now = Math.floor(Date.now() / 1000)
  return now < payload.exp
}