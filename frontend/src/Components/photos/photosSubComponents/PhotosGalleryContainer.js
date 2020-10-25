import React from 'react'

import PhotoTile from './PhotoTile'

class PhotosGalleryContainer extends React.Component {

  render() {
    const { followeePhotos, ownerPhotos, userProfile } = this.props
    const allPhotos = ownerPhotos.concat(followeePhotos)

    if (!allPhotos.length) return null

    return (
      <>
        <div className='image-grid-outer'>
          <div className='image-grid tiles' style={{ marginTop: '30px' }}>
            {allPhotos.map((photo, index) => {
              return (
                <PhotoTile {...photo} userProfile={userProfile} key={index} />
              )
            })}
          </div>
        </div>
      </>
    )

  }

}

export default PhotosGalleryContainer