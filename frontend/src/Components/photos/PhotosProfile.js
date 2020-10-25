/* eslint-disable camelcase */
import React from 'react'
import { Image, Icon } from 'semantic-ui-react'

import { getUserProfile } from '../../lib/api'
import PhotoTile from './photosSubComponents/PhotoTile'

class PhotosProfile extends React.Component {

  state = {
    userProfile: null
  }

  async componentDidMount() {
    const userProfile = await getUserProfile()

    this.setState({
      userProfile: userProfile.data
    })
  }

  render() {

    if (!this.state.userProfile) return <h1>Just getting that for you</h1>

    const { profile_image, first_name, last_name, following, created_photo } = this.state.userProfile

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
                <div key={index}>
                  <img src={photo.image} />
                </div>
              )
            })}
          </div>
        </div>


      </>
    )
  }

}

export default PhotosProfile