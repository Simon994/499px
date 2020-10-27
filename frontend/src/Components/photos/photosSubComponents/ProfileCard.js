/* eslint-disable camelcase */
import React from 'react'
import { Image, Button } from 'semantic-ui-react'

import { followProfile, unfollowProfile } from '../../../lib/api'

class ProfileCard extends React.Component {

  state = {
    following: false
  }

  handleFollowClick = async () => {
    try {
      const response = await followProfile(this.props.id)

      if (response.status === 202) {
        this.setState({
          following: true
        })
      } else {
        throw new Error()
      }
    } catch (err) {
      console.log(err)
    }
  }

  handleUnfollowClick = async () => {
    try {
      const response = await unfollowProfile(this.props.id)
      if (response.status === 202) {
        this.setState({
          following: false
        })
      } else {
        throw new Error()
      }
    } catch (err) {
      console.log(err)
    }
  }


  render() {
    const { profileImage, created_photo, first_name, last_name } = this.props
    const { following } = this.state
    const photosToDisplay = created_photo.slice(0, 3)

    return (
      <div className='profile-card-outer'>
        <div className='profile-card-imgcontainer'>
          {photosToDisplay.map(photo => {
            return <div
              key={photo.id}
              // src={photo.image}
              style={{ backgroundImage: `url(${photo.image})`, width: '75px', height: '90px', backgroundSize: 'cover' }}
              alt='from user profile'
              className='profile-card-img'
            />
          })}

        </div>
        <div className='profile-card-text'>
          <Image avatar src={profileImage} />
          <span>{first_name} {last_name}</span>
          {!following &&
            <Button
              className='lozenge follow'  
              floated='right'
              onClick={this.handleFollowClick}
            >Follow
            </Button>
          }
          {following &&
            <Button
              basic color='blue'
              floated='right'
              onClick={this.handleUnfollowClick}
            >Unfollow
            </Button>
          }
        </div>
      </div>
    )
  }

}

export default ProfileCard