/* eslint-disable camelcase */
import React from 'react'
import { Image, Button } from 'semantic-ui-react'

import { followProfile } from '../../../lib/api'

class ProfileCard extends React.Component {

  state = {
    following: false
  }

  handleClick = async () =>{
    
    try {
      const response = await followProfile(this.props.id)
      console.log(response)
    } catch (err) {
      console.log(err)
    }
  }


  render() {
    const { profileImage, created_photo, first_name, last_name } = this.props
    const photosToDisplay = created_photo.slice(0, 3)

    return (
      <div className='profile-card-outer'>
        {photosToDisplay.map(photo => {
          return <img
            key={photo.id}
            src={photo.image}
            alt='from user profile'
          />
        })}
        <div>
          <Image avatar src={profileImage}/>
          <span>{first_name} {last_name}</span>
          <Button
            primary
            floated='right'
            onClick={this.handleClick}
          >Follow
          </Button>
        </div>
      </div>
    )
  }

}

export default ProfileCard