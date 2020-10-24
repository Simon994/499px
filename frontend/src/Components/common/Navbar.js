import React from 'react'
import { Menu, Button, Image } from 'semantic-ui-react'
import { Link, withRouter } from 'react-router-dom'

import { isAuthenticated, getIsGettingToKnow } from '../../lib/auth'
import { getAvatar } from '../../lib/assets'

class Navbar extends React.Component {

  state = {
    avatar: ''
  }

  componentDidMount(){
    const avatar = getAvatar()

    this.setState({
      avatar 
    })
  }


  render() {
    if (!this.state.avatar) return <h1>Getting that</h1>

    const { avatar } = this.state
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
        {isAuthenticated() && 
        <Menu.Item>
          <Image avatar src={avatar}></Image>
          <Button>Upload</Button>
        </Menu.Item>

        }

      </Menu>

    )

  }

}

export default withRouter(Navbar)