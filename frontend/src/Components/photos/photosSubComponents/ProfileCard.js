/* eslint-disable camelcase */
import React from 'react'
import { Image, Button } from 'semantic-ui-react'

class ProfileCard extends React.Component {

  state = {

  }

  render() {
    const { profileImage, created_photo, first_name, last_name } = this.props
    const photosToDisplay = created_photo.slice(0, 3)

    console.log('THIS IS PROFILE IMAGE', profileImage)
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
          <Image avatar src={this.props.profileImage}/>
          <span>{first_name} {last_name}</span>
          <Button primary floated='right'>Follow</Button>
        </div>
      </div>
    )
  }

}

export default ProfileCard