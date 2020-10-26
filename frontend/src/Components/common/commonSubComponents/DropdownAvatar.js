import React from 'react'
import { Link, withRouter, Redirect } from 'react-router-dom'
import { Dropdown, Image } from 'semantic-ui-react'

import { logout } from '../../../lib/auth'

class DropdownAvatar extends React.Component {

  state = {
    redirect: false
  }

  trigger = () => {
    return (
      <span>
        <Image avatar src={this.props.sourceImage} />
      </span>
    )
  }

  switchProfile = () => {
    console.log('SWITCH!')

    this.setState({
      redirect: `/profile/${this.props.userId}`
    })
  }


  render() {

    // if (this.state.redirect) {
    //   console.log('REDIRECTING!')
    //   return <Redirect to={this.state.redirect}/>
    // }

    const options = [
      { key: 'Profile', text: 'Profile', as: Link, to: `/profile/${this.props.userId}`, onClick: this.switchProfile },
      { key: 'Log-out', text: 'Log out', as: Link, to: '/', onClick: logout }
    ]

    return (
      <>
        <Dropdown
          trigger={
            <span>
              <Image avatar src={this.props.sourceImage} />
            </span>
          }
          options={options}
          pointing='top left'
          icon={null}
        />
      </>
    )

  }

}

export default withRouter(DropdownAvatar)