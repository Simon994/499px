
export const setAvatar = (avatarSrc) => {
  localStorage.setItem('avatar', avatarSrc)
}

export const getAvatar = () => {
  return localStorage.getItem('avatar')
}