import { notify } from 'react-notify-toast'

const popupStyles = { 
  background: '#FF4C4C',
  text: 'white' 
}

export const popupNotification = message => {
  notify.show(message, 'custom', 3000, popupStyles)
}