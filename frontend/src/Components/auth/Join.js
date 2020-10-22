import React from 'react'
import { Button } from 'semantic-ui-react'
import { Link } from 'react-router-dom'


const Join = () => {

  return (
    <Button as={Link} to='/signup'>Continue with email</Button>
  )

}

export default Join