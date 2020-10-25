import React from 'react'
import { Button, Icon } from 'semantic-ui-react'

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
    const { heartColor } = this.state
    const allPhotos = ownerPhotos.concat(followeePhotos)

    console.log(allPhotos)

    if (!allPhotos.length) return null

    return (
      <>
        <div className='image-grid-outer'>
          <div className='image-grid tiles' style={{ marginTop: '30px' }}>
            {allPhotos.map((photo, index) => {
              return (
                <>
                  <div className="image-item tile" key={index} >
                    <img src={photo.image} />
                    <div className='details'>
                      <span className='title'>
                        {photo.owner}
                      </span>
                      <div className='heart-btn-container'>
                        {/* <Button className='heart-btn'> */}
                        <Icon
                          name='heart'
                          size='big'
                          color={heartColor}
                          onClick={this.handleLike} />
                        {/* </Button> */}
                      </div>
                    </div>
                  </div>
                  {/* <PhotoTile {...photo} key={index}/> */}
                </>
              )
            })}
          </div>
        </div>
      </>
    )

  }

}

export default PhotosGalleryContainer