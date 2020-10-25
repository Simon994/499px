import React from 'react'

class PhotosGalleryContainer extends React.Component {

  render() {
    const { followeePhotos, ownerPhotos } = this.props
    const allPhotos = ownerPhotos.concat(followeePhotos)

    console.log(allPhotos)

    if (!allPhotos.length) return null

    return (
      <>
        <div className='image-grid-outer'>
          <div className='image-grid tiles' style={{ marginTop: '30px' }}>
            {allPhotos.map((photo, index) => {
              return (
                <div className="image-item tile" key={index} >
                  <img src={photo.image} />
                  <div className='details'><span className='title'>{photo.id}</span></div>
                </div>
              )
            })}
          </div>
        </div>
      </>
    )

  }

}

export default PhotosGalleryContainer