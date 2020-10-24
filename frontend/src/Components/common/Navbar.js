import React from 'react'
import { Menu, Button } from 'semantic-ui-react'
import { Link, withRouter } from 'react-router-dom'

import { isAuthenticated, getIsGettingToKnow } from '../../lib/auth'

class Navbar extends React.Component {

  state = {

  }



  render() {

    return (
      <Menu>
        {(!getIsGettingToKnow() && !isAuthenticated()) &&
          <Menu.Item>
            <Button as={Link} to={'/login'}>
              login
            </Button>
            <Button as={Link} to={'/join'}>
              Sign up
            </Button>
          </Menu.Item>

        }

      </Menu>

    )

  }

}

export default withRouter(Navbar)