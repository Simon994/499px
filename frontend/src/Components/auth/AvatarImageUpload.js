import React from 'react'
import axios from 'axios'
import { Image, Loader } from 'semantic-ui-react'

import defaultAvatar from '../../styles/assets/empty-profile-picture.png'
import { popupNotification } from '../../lib/notifications'


const uploadUrl = process.env.REACT_APP_CLOUDINARY_URL
const uploadPreset = process.env.REACT_APP_CLOUDINARY_UPLOAD_PRESET

class AvatarImageUpload extends React.Component {
  state = {
    image: defaultAvatar,
    isLoadActive: false
  }

  handleUpload = async event => {
    this.setState({
      isLoadActive: true
    })
    
    const data = new FormData()
    data.append('file', event.target.files[0])
    data.append('upload_preset', uploadPreset)

    try {
      const res = await axios.post(uploadUrl, data)
      this.setState({
        isLoadActive: false,
        image: res.data.url
      }, () => {
        this.props.onChange(this.state.image)
      })
    } catch (err) {
      console.error(err)
      popupNotification('Something went wrong. Please try again or use a different photo')
      this.setState({
        isLoadActive: false
      })
    }
  }


  render() {
    const { image } = this.state

    if (this.state.isLoadActive) {
      return <Loader active inline='centered' indeterminate>Preparing photo</Loader>
    }

    return (
      <>
        <div style={{ width: '300px' }}>
          <Image
            src={image}
            alt="selected"
            avatar
            className='avatar-preview'
          />
        </div>
        <>
          <input
            type="file"
            name='file'
            id='file'
            className="inputfile"
            onChange={this.handleUpload}
          />
          <label htmlFor="file" style={{ cursor: 'pointer' }}>Add avatar</label>
        </>
      </>
    )
  }

}

export default AvatarImageUpload