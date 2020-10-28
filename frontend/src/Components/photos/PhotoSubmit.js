import React from 'react'
import Select from 'react-select'

import { Form, Button, Loader } from 'semantic-ui-react'
import { Redirect } from 'react-router-dom'

import { createPhoto } from '../../lib/api'
import { popupNotification } from '../../lib/notifications'
import { photoCategories } from './photosSubComponents/PhotoCategories'

class PhotoSubmit extends React.Component {

  state = {
    formData: {
      image: '',
      title: '',
      description: '',
      camera: '',
      lens: '',
      location: '',
      categories: []
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

  handleMultiSelectChange = (selected) => {
    const selectedCategories = selected ? selected.map(item => item.value) : []
    const selectedCategoriesPks = []
    // Backend currently only accepts pks for category. Quick fix here to look through available
    //categories (stored in PhotoCategories.js) and convert category name selected to pk.
    if (selectedCategories) {
      selectedCategories.forEach(selectedCategory => {
        const foundCategory = photoCategories.filter(photoCategory => {
          return photoCategory.fields.name === selectedCategory
        })
        selectedCategoriesPks.push(foundCategory[0].pk)
      })
    }

    const formData = {
      ...this.state.formData,
      categories: selectedCategoriesPks
    }

    this.setState({ formData })
  }

  handleSubmit = async (e) => {
    e.preventDefault()

    try {
      await createPhoto(this.state.formData)

      this.setState({
        formData: {
          image: '',
          title: '',
          description: '',
          camera: '',
          location: '',
          categories: []
        },
        redirect: '/photoshome'
      })
    } catch (err) {
      console.error('ERR in photo upload', err.response.data)
      popupNotification('Please provide at least Title, Location and one Category')
    }
  }

  render() {

    if (this.state.redirect) {
      return <Redirect to={this.state.redirect} />
    }

    if (!this.state.formData.image) return <Loader active inline='centered' />

    const { image, title, description, location, camera, lens } = this.state.formData

    const options = photoCategories.map(category => {
      return { value: category.fields.name, label: category.fields.name }
    })


    return (
      <>
        <h3 className='upload-header'>Upload</h3>
        <div className='photo-submit-outer'>
          <div className='image-upload-container'>
            <img src={image} alt='uploaded'/>
          </div>
          <div className='photo-form-container'>
            <Form onSubmit={this.handleSubmit}>
              <div className='upload-form-inner-top'>
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
                <label className='form-label'>Categories</label>
                <Select
                  options={options}
                  isMulti
                  onChange={this.handleMultiSelectChange}
                />
                <br/>
                <Form.Field>
                  <label className='form-label'>Camera</label>
                  <input placeholder='Camera'
                    onChange={this.handleChange}
                    value={camera}
                    name='camera'
                  />
                </Form.Field>
                <Form.Field>
                  <label className='form-label'>Lens</label>
                  <input placeholder='Lens'
                    onChange={this.handleChange}
                    value={lens}
                    name='lens'
                  />
                </Form.Field>
              </div>
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