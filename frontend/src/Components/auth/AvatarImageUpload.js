import React from 'react'
import axios from 'axios'
import defaultAvatar from '../../styles/assets/empty-profile-picture.png'

import { Image } from 'semantic-ui-react'

const uploadUrl = process.env.REACT_APP_CLOUDINARY_URL
const uploadPreset = process.env.REACT_APP_CLOUDINARY_UPLOAD_PRESET

class AvatarImageUpload extends React.Component {
  state = {
    image: defaultAvatar
  }

  handleUpload = async event => {
    const data = new FormData()
    data.append('file', event.target.files[0])
    data.append('upload_preset', uploadPreset)

    const res = await axios.post(uploadUrl, data)
    this.setState({
      image: res.data.url
    }, () => {
      this.props.onChange(this.state.image)
    })
  }


  render() {
    const { image } = this.state

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