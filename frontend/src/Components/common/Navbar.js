import React from 'react'
import { Menu, Button, Icon } from 'semantic-ui-react'
import { Link, withRouter } from 'react-router-dom'

import DropdownAvatar from './commonSubComponents/DropdownAvatar'
import { isAuthenticated, getIsGettingToKnow } from '../../lib/auth'
import { getAvatar } from '../../lib/assets'


class Navbar extends React.Component {

  state = {
    avatar: ''
  }

  async componentDidMount(){
    const avatar = getAvatar()

    this.setState({
      avatar 
    })
  }

  
  render() {
    const { avatar } = this.state

    return (
      <nav className='navbar'>
        <div className='logo'>
          <p>499<sup>px</sup></p>
        </div>
        <div className='nav-btns'>
          {(!getIsGettingToKnow() && !isAuthenticated()) &&
            <div>
              <Link to={'/login'}>
              Log in
              </Link>
              <Button className='lozenge' as={Link} to={'/join'}>
              Sign up
              </Button>
            </div>
          }
          {isAuthenticated() && 
        <Menu.Item>
          <DropdownAvatar sourceImage={avatar ? avatar : ''}></DropdownAvatar>
          <Button className='lozenge upload' as={Link} to={'/upload'}><Icon name='arrow up'/>Upload</Button>
        </Menu.Item>

          }
        </div>

      </nav>

    )

  }

}

export default withRouter(Navbar)