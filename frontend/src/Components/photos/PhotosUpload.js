import React from 'react'
import axios from 'axios'

import { Button, Icon } from 'semantic-ui-react'
import { Redirect } from 'react-router-dom'

const uploadUrl = process.env.REACT_APP_CLOUDINARY_URL
const uploadPreset = process.env.REACT_APP_CLOUDINARY_UPLOAD_PRESET

class PhotosUpload extends React.Component {

  state = {
    image: ''
  }

  handleUpload = async event => {
    const data = new FormData()
    data.append('file', event.target.files[0])
    data.append('upload_preset', uploadPreset)

    const res = await axios.post(uploadUrl, data)
    this.setState({
      image: res.data.url
    })
  }


  render() {

    if (this.state.image) {
      return <Redirect to={{
        pathname: '/submitphoto',
        state: this.state
      }} />
    }

    return (
      <>
        <h3 className='upload-header'>Upload</h3>
        <div className='upload-btn-container'>
          <input
            type="file"
            name='file'
            id='file'
            className="inputfile"
            onChange={this.handleUpload}
          />
          <Icon name='arrow up' size='big' />
          <h3>Upload photos</h3>
          <Button primary className='upload-btn lozenge'>
            <label htmlFor="file" className='upload-label'>Select photo</label>
          </Button>
        </div>
      </>
    )
  }

}

export default PhotosUpload