/* eslint-disable camelcase */
import React from 'react'

import { Form, Button } from 'semantic-ui-react'
import { Redirect } from 'react-router-dom'

import AvatarImageUpload from './AvatarImageUpload'
import { registerUser } from '../../lib/api'
import { gottenToKnow } from '../../lib/auth'

class GetToKnow extends React.Component {

  state = {
    formData: null,
    redirect: false
  }

  async componentDidMount() {
    // console.log('FORM DATA:')
    const { formData } = this.props.location.state
    const extendedFormData = {
      ...formData,
      first_name: '',
      last_name: '',
      username: '',
      profile_image: ''
    }

    this.setState({
      formData: extendedFormData
    })
  }

  handleChange = (e) => {
    const formData = {
      ...this.state.formData,
      [e.target.name]: e.target.value
    }
    this.setState({ formData })
  }

  handleImageChange = url => {
    const formData = { ...this.state.formData, profile_image: url }
    this.setState({ formData })
  }

  handleSubmit = async (e) => {
    e.preventDefault()
    const dataToSend = ({ ...this.state.formData })

    try {
      const response = await registerUser(dataToSend)
      if (response.status === 201) {
        console.log('GOT THAT RESPONSE 🌴', response)
        gottenToKnow()
        
        this.setState({
          redirect: '/login'
        })
      }
    } catch (err) {
      console.log('GOT THAT ERR', err)
      this.setState({ formUsernameError: true })
    }
  }


  render() {

    if (!this.state.formData) return null

    const { first_name, last_name, username } = this.state.formData

    if (this.state.redirect) {
      return <Redirect to={this.state.redirect} />
    }

    return (
      <>
        <Form onSubmit={this.handleSubmit}>
          <AvatarImageUpload
            labelText="Profile Image"
            onChange={this.handleImageChange}
          />
          <Form.Field>
            <label className='form-label'>First name</label>
            <input placeholder=''
              onChange={this.handleChange}
              value={first_name}
              name='first_name'
            />
          </Form.Field>
          <Form.Field>
            <label className='form-label'>Last name</label>
            <input placeholder=''
              onChange={this.handleChange}
              value={last_name}
              name='last_name'
            />
          </Form.Field>
          <Form.Field>
            <label className='form-label'>Username</label>
            <input placeholder=''
              onChange={this.handleChange}
              value={username}
              name='username'
            />
          </Form.Field>
          <Form.Field control={Button}>Submit</Form.Field>
        </Form>
      </>
    )
  }

}

export default GetToKnow