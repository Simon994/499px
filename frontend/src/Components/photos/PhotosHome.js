import React from 'react'

import ProfileCard from './photosSubComponents/ProfileCard'

import { getProfileIndex } from '../../lib/api'

class PhotosHome extends React.Component {

  state = {
    profilesSuggestedToFollow: []
  }

  async componentDidMount() {

    const response = await getProfileIndex()

    const profilesWithPhotos = response.data.filter(profile => {
      return profile.created_photo.length >= 3
    })
    const profilesSuggestedToFollow = []

    if (profilesWithPhotos.length >= 10) {
      for (let i = 0; i < 10; i++) {
        profilesSuggestedToFollow.push(profilesWithPhotos[i])
      }
    } else {
      profilesWithPhotos.forEach(profile => profilesSuggestedToFollow.push(profile))
    }

    this.setState({
      profilesSuggestedToFollow
    })

  }

  render() {
    const { profilesSuggestedToFollow } = this.state
    
    return (
      <>
        <h1>Photos Home</h1>
        <div className='profiles-to-follow'>
          {
            profilesSuggestedToFollow.map(profile => {
              return <ProfileCard
                key={profile.id}
                created_photo={profile.created_photo}
                username = {profile.username}
              />
            })
          }
        </div>
      </>
    )
  }
}

export default PhotosHome