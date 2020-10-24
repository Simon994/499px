import React from 'react'
import { Button, Form, Icon, Message } from 'semantic-ui-react'
import { Redirect, Link } from 'react-router-dom'

import { loginUser, getUserProfile } from '../../lib/api'
import { setToken } from '../../lib/auth'

class Login extends React.Component {

  state = {
    formData: {
      email: '',
      password: ''
    },
    formUsernameError: false
  }

  handleChange = (e) => {
    const formData = {
      ...this.state.formData,
      [e.target.name]: e.target.value
    }
    this.setState({
      formData,
      formUsernameError: false
    })
  }


  handleSubmit = async (e) => {
    e.preventDefault()

    try {
      const res = await loginUser(this.state.formData)
      setToken(res.data.token)

      const userProfile = await getUserProfile()
      console.log('GOT USER PROFILE 🦑', userProfile.data)

      this.setState({
        redirect: '/photoshome'
      })

    } catch (err) {
      this.setState({ formUsernameError: true })
    }
  }


  render() {

    const { email, password } = this.state.formData

    if (this.state.redirect) {
      return <Redirect to={this.state.redirect} />
    }

    return (
      <>

        <div className='auth-form-container' >
          <div className='auth-container'>
            <Form onSubmit={this.handleSubmit} error={this.state.formUsernameError}>
              {this.state.formUsernameError ? (
                <Message error header='Fail' content='Please enter your email and password' />
              ) : null}
              <h2>Log in to 499px</h2>
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
              <Button className='lozenge login-email-btn' type='submit'>Log in</Button>

              <Button className='lozenge login-fb-btn' type='submit' animated='fade'>
                <Button.Content visible>
                  <Icon name='facebook official' />
                Log in with Facebook
                </Button.Content>
                <Button.Content hidden>
                  <Icon color='red' name='warning' />
                  Coming soon</Button.Content>
              </Button>

              <Button className='lozenge login-google-btn' type='submit' animated='fade'>
                <Button.Content visible>
                  <Icon name='google' />
                Log in with Google
                </Button.Content>
                <Button.Content hidden>
                  <Icon color='red' name='warning' />
                  Coming soon</Button.Content>
              </Button>
            </Form>
            <p>Don't have an account? <Link to='/signup'>Sign up</Link></p>
          </div>
        </div>

      </>
    )
  }

}

export default Login

