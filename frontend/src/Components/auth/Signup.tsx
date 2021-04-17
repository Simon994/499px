import React from 'react'

import { Form, Button, Divider, Header } from 'semantic-ui-react'
import { Redirect, Link } from 'react-router-dom'

import { setIsGettingToKnow } from '../../lib/auth'
import { popupNotification } from '../../lib/notifications'


interface State {
  redirect: string;
}

class Signup extends React.Component<State> {

  state = {
    formData: {
      email: '',
      password: ''
    },
    redirect: ''
  }

  handleChange = (e: React.FormEvent<HTMLInputElement>): void => {
    const formData = {
      ...this.state.formData,
      [(e.target as HTMLInputElement).name]: (e.target as HTMLInputElement).value
    }
    this.setState({ formData })
  }

  handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault()
    const { password, email } = this.state.formData

    try {
      if (!password || !email) throw new Error('missing emai/password')
      if (password.length < 8) throw new Error('password length to short')
      setIsGettingToKnow()

      const formData = {
        ...this.state.formData,
        // eslint-disable-next-line @typescript-eslint/camelcase
        password_confirmation: password
      }

      this.setState({
        formData,
        redirect: '/gettoknow'
      })
    } catch (err) {
      console.log(err.message)
      err.message === 'password length to short' ?
        popupNotification('Password length too short')
        :
        popupNotification('Please provide both email and password')
    }
  }

  render(): JSX.Element {
    const { email, password } = this.state.formData

    if (this.state.redirect) {
      return <Redirect to={{
        pathname: this.state.redirect,
        state: this.state
      }} />
    }

    return (
      <>
        <div className='auth-form-container' >
          <div className='auth-container'>
            <Form onSubmit={this.handleSubmit}>
              <p className='signup'>Sign up</p>
              <Divider horizontal>
                <Header as='h6'>here</Header>
              </Divider>

              <Form.Field>
                <label className='form-label'>Email</label>
                <input placeholder=''
                  onChange={this.handleChange}
                  value={email}
                  name='email'
                  data-cy='signup-email'
                />
              </Form.Field>
              <Form.Field>
                <label className='form-label'>Password</label>
                <input placeholder='(minimum 8 characters)'
                  onChange={this.handleChange}
                  type='password'
                  value={password}
                  name='password'
                  data-cy='signup-password'
                />
              </Form.Field>
              <Button className='lozenge signup-email-btn' type='submit'>Sign up</Button>
            </Form>
            <p className='have-account'>Already have an account? <Link to='/login'>Log in</Link></p>
          </div>
        </div>
      </>

    )




  }

}


export default Signup