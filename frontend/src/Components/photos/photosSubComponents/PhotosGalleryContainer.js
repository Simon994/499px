import React from 'react'

class PhotosGalleryContainer extends React.Component {

  render() {
    const { photos } = this.props

    if (!photos.length) return null

    return (
      <>
        <h1>Photos by people you follow:</h1>
        <div className='photos-by-followees tiles'>
          {photos.map(photo => {
            return (
              <div key={photo.id} className='tile'>
                <img className='photo-by-followee' src={photo.image} />
                <div className='details'><span className='title'>{photo.id}</span></div>
              </div>
            )
          })}
        </div>
      </>
    )

  }

}

export default PhotosGalleryContainer