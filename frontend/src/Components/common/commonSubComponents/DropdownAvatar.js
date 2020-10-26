import React from 'react'
import { Link } from 'react-router-dom'
import { Dropdown, Image } from 'semantic-ui-react'

import { logout } from '../../../lib/auth'

const DropdownAvatar = (props) => {

  const trigger = (
    <span>
      <Image avatar src={props.sourceImage} />
    </span>
  )

  const options = [
    { key: 'Profile', text: 'Profile', as: Link, to: `/profile/${props.userId}` },
    { key: 'Log-out', text: 'Log out', as: Link, to: '/', onClick: logout }
  ]

  return (
    <>
      <Dropdown
        trigger={trigger}
        options={options}
        pointing='top left'
        icon={null}
      />
    </>
  )

}

export default DropdownAvatar