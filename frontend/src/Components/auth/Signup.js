import React from 'react'

import { Form, Button } from 'semantic-ui-react'
import { Redirect } from 'react-router-dom'

import { setIsGettingToKnow } from '../../lib/auth'

class Signup extends React.Component {

  state = {
    formData: {
      email: '',
      password: ''
    },
    redirect: false
  }

  handleChange = (e) => {
    const formData = {
      ...this.state.formData,
      [e.target.name]: e.target.value
    }
    this.setState({ formData })
  }


  handleSubmit = (e) => {
    e.preventDefault()
    
    setIsGettingToKnow()

    const { password } = this.state.formData
    const formData = {
      ...this.state.formData,
      password_confirmation: password
    }

    this.setState({
      formData,
      redirect: '/gettoknow'
    })
  }

  render() {
    const { email, password } = this.state.formData

    if (this.state.redirect) {
      return <Redirect to={{
        pathname: this.state.redirect,
        state: this.state
      }} />
    }

    return (
      <>
        <Form onSubmit={this.handleSubmit}>
          <Form.Field>
            <label className='form-label'>Email</label>
            <input placeholder='email'
              onChange={this.handleChange}
              value={email}
              name='email'
            />
          </Form.Field>
          <Form.Field>
            <label className='form-label'>Password</label>
            <input placeholder='password'
              onChange={this.handleChange}
              value={password}
              name='password'
            />
          </Form.Field>
          <Form.Field control={Button}>Submit</Form.Field>
        </Form>

      </>

    )




  }

}


export default Signup