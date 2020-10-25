import React from 'react'
import { Form, Button } from 'semantic-ui-react'
import { Redirect } from 'react-router-dom'

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
    },
    redirect: false
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
      await createPhoto(this.state.formData)

      this.setState({
        formData: {
          image: '',
          title: '',
          description: '',
          camera: '',
          location: '',
          categories: [5]
        },
        redirect: '/photoshome'
      })
    } catch (err) {
      console.error('ERR in photo upload', err.response.data)
    }
  }

  render() {

    if (this.state.redirect) {
      return <Redirect to={this.state.redirect} />
    }

    if (!this.state.formData.image) return <h1>Just getting that for you</h1>

    const { image, title, description, location } = this.state.formData

    return (
      <>
        <h3 className='upload-header'>Upload</h3>
        <div className='photo-submit-outer'>
          <div className='image-upload-container'>
            <img src={image} />
          </div>
          <div className='photo-form-container'>
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
              <div className='upload-btns-container'>
                <Button className='lozenge'>Upload</Button>

              </div>
              
            </Form>
          </div>
        </div>
      </>
    )
  }

}

export default PhotoSubmit