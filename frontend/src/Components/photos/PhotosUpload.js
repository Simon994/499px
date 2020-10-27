import React from 'react'
import axios from 'axios'

import { Button, Icon, Loader } from 'semantic-ui-react'
import { Redirect } from 'react-router-dom'

import { popupNotification } from '../../lib/notifications'

const uploadUrl = process.env.REACT_APP_CLOUDINARY_URL
const uploadPreset = process.env.REACT_APP_CLOUDINARY_UPLOAD_PRESET

class PhotosUpload extends React.Component {

  state = {
    image: '',
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
        image: res.data.url,
        isLoadActive: false
      })
    } catch (err) {
      console.error(err)
      popupNotification('Something went wrong. Please try again or use a different photo')
    }
  }


  render() {

    if (this.state.image) {
      return <Redirect to={{
        pathname: '/submitphoto',
        state: this.state
      }} />
    }

    if (this.state.isLoadActive) {
      return <Loader active inline='centered' indeterminate>Preparing photo</Loader>
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