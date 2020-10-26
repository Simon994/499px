/* eslint-disable camelcase */
import React from 'react'

import { getPublicUserProfile } from '../../lib/api'

class PhotosProfile extends React.Component {

  state = {
    userProfile: null
  }

  async componentDidMount() {
    const userId = this.props.match.params.id
    const userProfile = await getPublicUserProfile(userId)

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