import React from 'react'

import PhotoTile from './PhotoTile'

class PhotosGalleryContainer extends React.Component {

  state = {
    heartColor: 'grey'
  }

  handleLike = () => {
    console.log('LIKED')

    this.setState({
      heartColor: 'pink'
    })
  }

  render() {
    const { followeePhotos, ownerPhotos } = this.props
    // const { heartColor } = this.state
    const allPhotos = ownerPhotos.concat(followeePhotos)

    console.log(allPhotos)

    if (!allPhotos.length) return null

    return (
      <>
        <div className='image-grid-outer'>
          <div className='image-grid tiles' style={{ marginTop: '30px' }}>
            {allPhotos.map((photo, index) => {
              return (
                <PhotoTile {...photo} key={index} />
              )
            })}
          </div>
        </div>
      </>
    )

  }

}

export default PhotosGalleryContainer