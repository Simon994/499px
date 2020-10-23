/* eslint-disable camelcase */
import React from 'react'
import { Image, Button } from 'semantic-ui-react'

import { followProfile, unfollowProfile } from '../../../lib/api'

class ProfileCard extends React.Component {

  state = {
    following: false
  }

  handleFollowClick = async () =>{
    try {
      const response = await followProfile(this.props.id)
      
      if (response.status === 202){
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
      if (response.status === 202){
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
          {!following &&
            <Button
              primary
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