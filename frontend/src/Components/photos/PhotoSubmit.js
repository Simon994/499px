import React from 'react'
import { Form, Button } from 'semantic-ui-react'

import { createPhoto } from '../../lib/api'

class PhotoSubmit extends React.Component {

  state = {
    formData: {
      image: '',
      title: '',
      description: '',
      camera: '',
      location: '',
      categories: [5]
    }
  }

  componentDidMount() {
    const { image } = this.props.location.state

    this.setState({
      formData: {
        ...this.state.formData,
        image: image
      }
    })
  }

  handleChange = (e) => {
    const formData = {
      ...this.state.formData,
      [e.target.name]: e.target.value
    }
    this.setState({ formData })
  }

  handleSubmit = async (e) => {
    e.preventDefault()
    console.log(this.state.formData)
    try {
      const response = await createPhoto(this.state.formData)
      console.log('POSTED PHOTO! 🍤', response)
    } catch (err){
      console.log('ERRR 💩', err.response.data)
    }
  }

  render() {

    if (!this.state.formData.image) return <h1>Just getting that for you</h1>

    const { image, title, description, camera, location } = this.state.formData

    return (
      <div className='photo-submit-outer'>
        <div className='image-upload-container'>
          <img src={image} />
        </div>
        <Form onSubmit={this.handleSubmit}>
          <Form.Field>
            <label className='form-label'>Title</label>
            <input placeholder='Enter Title'
              onChange={this.handleChange}
              value={title}
              name='title'
            />
          </Form.Field>
          <Form.Field>
            <label className='form-label'>Description</label>
            <textarea placeholder='e.g. High angle view of a couple, looking down over a wide valley'
              onChange={this.handleChange}
              value={description}
              name='description'
            />
          </Form.Field>
          <Form.Field>
            <label className='form-label'>Location</label>
            <input placeholder='Enter Location'
              onChange={this.handleChange}
              value={location}
              name='location'
            />
          </Form.Field>
          <Form.Field control={Button}>Upload</Form.Field>
        </Form>
      </div>
    )
  }

}

export default PhotoSubmit