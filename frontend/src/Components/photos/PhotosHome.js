import React from 'react'

import { getProfileIndex } from '../../lib/api'

class PhotosHome extends React.Component {

  state = {
    profilesSuggestedToFollow: []
  }

  async componentDidMount(){

    const response = await getProfileIndex()

    const profilesWithPhotos = response.data.filter(profile => {
      return profile.created_photo.length >= 3
    })
    const profilesSuggestedToFollow = []
    
    if (profilesWithPhotos.length >= 10){
      for (let i = 0; i < 10; i++){
        profilesSuggestedToFollow.push(profilesWithPhotos[i])
      }
    } else {
      profilesWithPhotos.forEach(profile => profilesSuggestedToFollow.push(profile))
    } 

    this.setState({
      profilesSuggestedToFollow
    })

  }

  render(){
    return (
      <h1>Photos Home</h1>
    )
  }
}

export default PhotosHome