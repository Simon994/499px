/* eslint-disable camelcase */
import React from 'react'

import { Form, Button } from 'semantic-ui-react'
import { Redirect } from 'react-router-dom'

import AvatarImageUpload from './AvatarImageUpload'
import { registerUser } from '../../lib/api'
import { gottenToKnow } from '../../lib/auth'
import { setAvatar } from '../../lib/assets'

class GetToKnow extends React.Component {

  state = {
    formData: null,
    redirect: false
  }

  async componentDidMount() {
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
        gottenToKnow()
        setAvatar(this.state.formData.profile_image)

        this.setState({
          redirect: '/login'
        })
      }
    } catch (err) {
      console.log(err)
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
        <div className='auth-form-container' >
          <div className='auth-container'>
            <h2>Welcome to 499px.<br />
              Let's get to know you a little.
            </h2>
            <Form onSubmit={this.handleSubmit}>
              <div className='avatar-img-upload'>
                <AvatarImageUpload
                  labelText="Profile Image"
                  onChange={this.handleImageChange}
                />
              </div>
              <br/>
              <br/>
              <Form.Field>
                <label className='form-label'>First name</label>
                <input placeholder=''
                  onChange={this.handleChange}
                  value={first_name}
                  name='first_name'
                  className='first-input-gtk'
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
              <Button className='lozenge signup-email-btn' type='submit'>Next</Button>
            </Form>
          </div>
        </div>
      </>
    )
  }

}

export default GetToKnow