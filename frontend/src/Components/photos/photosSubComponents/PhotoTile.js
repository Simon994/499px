import React from 'react'
import { Icon } from 'semantic-ui-react'

class PhotoTile extends React.Component {

  state = {
    heartColor: 'grey'
  }

  handleLike = () => {



    this.setState({
      heartColor: 'pink'
    })
  }

  render() {
    console.log(this.props)
    
    const { image, owner } = this.props
    const { heartColor } = this.state
    return (
      <div className="image-item tile" >
        <img src={ image} />
        <div className='details'>
          <span className='title'>
            {owner}
          </span>
          <div className='heart-btn-container'>
            <Icon
              name='heart'
              size='big'
              color={heartColor}
              onClick={this.handleLike} />
          </div>
        </div>
      </div >
    )
  }

}

export default PhotoTile