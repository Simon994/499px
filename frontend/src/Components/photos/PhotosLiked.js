import React from 'react'
import { Loader } from 'semantic-ui-react'

import ProfilePhotoTile from './photosSubComponents/ProfilePhotoTile'
import { getUserProfile } from '../../lib/api'

class PhotosLiked extends React.Component {

  state = {
    likedPhotos: null,
    currentUserId: null
  }

  componentDidMount = async () => {

    try {
      const response = await getUserProfile()

      this.setState({
        likedPhotos: response.data.liked_photos,
        currentUserId: response.data.id
      })
    } catch (err) {
      console.log(err)
    }
  }

  render() {

    if (!this.state.likedPhotos) return <Loader active inline='centered' />
    
    const { likedPhotos, currentUserId } = this.state

    return (
      <div className='image-grid-outer'>
        <div className='image-grid tiles' style={{ marginTop: '30px' }}>
          { likedPhotos.map((photo, index) => {
            return (
              <ProfilePhotoTile
                photo={photo}
                key={index}
                currentUserId={currentUserId}
              />
            )
          })}
        </div>
      </div>

    )
  }
}

export default PhotosLiked