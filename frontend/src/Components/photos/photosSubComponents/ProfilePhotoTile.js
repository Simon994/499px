import React from 'react'
import { Icon } from 'semantic-ui-react'

class ProfilePhotoTile extends React.Component {

  render() {
    const { image, title } = this.props.photo
    
    return (
      <div className='image-item tile'>
        <img src={image} />
        <div className='details'>
          <span className='title'>{title}</span>
          <div className='heart-btn-container'>
            <Icon
              name='heart'
              size='big'
              color='grey'
              onClick={this.handleClick} />
          </div>
        </div>
      </div>
    )
  }

}

export default ProfilePhotoTile