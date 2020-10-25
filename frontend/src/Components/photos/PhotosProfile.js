/* eslint-disable camelcase */
import React from 'react'
import { Image } from 'semantic-ui-react'

import { getUserProfile } from '../../lib/api'

class PhotosProfile extends React.Component {

  state = {
    userProfile: null
  }

  async componentDidMount() {
    const userProfile = await getUserProfile()
    console.log('PROFILE PAGE', userProfile.data)

    this.setState({
      userProfile: userProfile.data
    })
  }

  render() {

    if (!this.state.userProfile) return <h1>Just getting that for you</h1>

    const { profile_image, first_name, last_name } = this.state.userProfile

    return (
      <>
        <h1>your profile here</h1>
        <div className='profile-summary-info'>
          <div style={{ width: '300px' }}>
            <img
              src={profile_image}
              alt="selected"
              style={{ borderRadius: '50%', width: '90px', height: '90px', objectFit: 'cover'}}
            />
          </div>
          <h1>{first_name} {last_name}</h1>
          
        </div>
      </>
    )
  }

}

export default PhotosProfile