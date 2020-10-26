/* eslint-disable camelcase */
import React from 'react'
import { Icon } from 'semantic-ui-react'

import ProfilePhotoTile from './photosSubComponents/ProfilePhotoTile'
import { getPublicUserProfile, getUserProfile } from '../../lib/api'


class PhotosProfile extends React.Component {

  state = {
    userProfile: null,
    heartColor: 'grey',
    liked: false,
    currentUserId: null
  }

  async componentDidMount() {
    const userId = this.props.match.params.id
    const userProfile = await getPublicUserProfile(userId)
    const currentUserProfile = await getUserProfile()
    console.log("THIS IS CURRENT USER", currentUserProfile)

    this.setState({
      userProfile: userProfile.data,
      currentUserId: currentUserProfile.data.id
    })
  }


  render() {
    console.log('RENDERING PHOTOSPROF')
    if (!this.state.userProfile) return <h1>Just getting that for you</h1>

    const { profile_image,
      first_name,
      last_name,
      following,
      created_photo } = this.state.userProfile
    
    const { currentUserId } = this.state

    return (
      <>
        <div className='profile-summary-info'>
          <div style={{ width: '300px' }}>
            <img
              src={profile_image}
              alt="selected"
              style={{ borderRadius: '50%', width: '90px', height: '90px', objectFit: 'cover' }}
            />
          </div>
          <h1>{first_name} {last_name}</h1>
          <div>
            <p>{following.length} following</p>
          </div>
        </div>

        <div className='image-grid-outer'>
          <div className='image-grid tiles' style={{ marginTop: '30px' }}>
            {created_photo.map((photo, index) => {
              console.log('ADDING IMG TO PROFILE PHOTS')
              return (
                <div className='image-item tile' key={index}>
                  <img src={photo.image} />
                  <div className='details'>
                    <span className='title'>{photo.title}</span>
                    <div className='heart-btn-container'>
                      <Icon
                        name='heart'
                        size='big'
                        color='grey'
                        onClick={this.handleClick} />
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        <div className='image-grid-outer'>
          <div className='image-grid tiles' style={{ marginTop: '30px' }}>
            {created_photo.map((photo, index) => {
              console.log('ADDING IMG TO PROFILE PHOTS')
              return (
                <ProfilePhotoTile 
                  photo={photo}
                  key={index}
                  currentUserId={currentUserId}/>
              )
            })}
          </div>
        </div>

      </>
    )
  }

}

export default PhotosProfile