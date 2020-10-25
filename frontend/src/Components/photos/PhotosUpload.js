import React from 'react'
import axios from 'axios'

import { Button } from 'semantic-ui-react'
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

    if (this.state.image){
      return <Redirect to={{
        pathname: '/submitphoto',
        state: this.state
      }} />
    }

    return (
      <>
        <input
          type="file"
          name='file'
          id='file'
          className="inputfile"
          onChange={this.handleUpload}
        />
        <Button primary className='upload-btn'>
          <label htmlFor="file" className='upload-label'>Upload photo</label>
        </Button>
      </>
    )
  }

}

export default PhotosUpload