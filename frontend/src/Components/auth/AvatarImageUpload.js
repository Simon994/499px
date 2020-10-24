import React from 'react'
import axios from 'axios'

const uploadUrl = process.env.REACT_APP_CLOUDINARY_URL
const uploadPreset = process.env.REACT_APP_CLOUDINARY_UPLOAD_PRESET

class AvatarImageUpload extends React.Component {
  state = {
    image: 'https://www.pngitem.com/pimgs/m/73-734701_customer-icon-person-head-and-shoulders-silhouette-hd.png'
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
          <img
            src={image}
            alt="selected"
            style={{ width: '140px', height: '120px', borderRadius: '50%', borderWidth: '1px', borderStyle: 'solid', borderColor: 'black' }}
          />
        </div>
        <>
          {/* <label className="label">{this.props.labelText || 'Upload Image'}</label> */}
          <input
            type="file"
            name='file'
            id='file'
            className="inputfile"
            onChange={this.handleUpload}
          />
          <label htmlFor="file">Add avatar</label>
        </>
      </>
    )
  }

}

export default AvatarImageUpload