
export const setAvatar = (avatarSrc) => {
  localStorage.setItem('avatar', avatarSrc)
}

export const getAvatar = () => {
  return localStorage.getItem('avatar')
}

export const setUserId = (userId) => {
  localStorage.setItem('userId', userId)
}

export const getUserId = () => {
  return localStorage.getItem('userId')
}