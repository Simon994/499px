import React from 'react'
import { Button, Icon } from 'semantic-ui-react'
import { Link } from 'react-router-dom'


const Join = () => {

  return (
    <>

      <div className='auth-form-container' >
        <div className='auth-container'>
          <h2>Join 499px</h2>
          <p className='signup'>Discover and share increadible photos, gain global exposure</p>
          
          <Button 
            className='lozenge login-email-btn'
            type='submit'
            as={Link}
            to='/signup'
            data-cy='join-email-signup'
          >
            <Icon name='mail' />
            Continue with email
          </Button>

          <Button className='lozenge login-fb-btn' type='submit' animated='fade'>
            <Button.Content visible>
              <Icon name='facebook official' />
                Continue with Facebook
            </Button.Content>
            <Button.Content hidden>
              <Icon color='red' name='warning' />
                  Coming soon
            </Button.Content>
          </Button>

          <Button className='lozenge login-google-btn' type='submit' animated='fade'>
            <Button.Content visible>
              <Icon name='google' />
                Continue with Google
            </Button.Content>
            <Button.Content hidden>
              <Icon color='red' name='warning' />
                  Coming soon
            </Button.Content>
          </Button>

          <p className='have-account'>Already have an account? <Link to='/login'>Log in</Link></p>
        </div>
      </div>


    </>
  )

}

export default Join