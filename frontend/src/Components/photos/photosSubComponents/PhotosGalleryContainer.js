import React from 'react'

class PhotosGalleryContainer extends React.Component {

  render() {
    const { photos } = this.props

    if (!photos.length) return null

    return (
      <>
        <h1>Photos by people you follow:</h1>
        <div>
          {photos.map(photo => {
            return <img key={photo.id} src={photo.image} />
          })}
        </div>
      </>
    )

  }

}

export default PhotosGalleryContainer