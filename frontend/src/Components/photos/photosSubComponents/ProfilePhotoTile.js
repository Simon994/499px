import React from 'react'
import { Link } from 'react-router-dom'
import { Icon } from 'semantic-ui-react'
import { likePhoto, unlikePhoto } from '../../../lib/api'

class ProfilePhotoTile extends React.Component {

  state = {
    heartColor: 'grey',
    liked: false
  }

  componentDidMount(){

    const likedByArrayIds = this.props.photo.liked_by.map(likedBy => likedBy.id )
    const isLikedByCurrentUser = likedByArrayIds.includes(this.props.currentUserId)

    const heartColor = isLikedByCurrentUser ? 'pink' : 'grey'

    this.setState({
      heartColor,
      liked: isLikedByCurrentUser
    })
  }


  handleClick = async() => {
    const { id } = this.props.photo
    const { liked } = this.state

    if (!liked){
      try {
        await likePhoto(id)
        this.setState({
          heartColor: 'pink',
          liked: true
        })
      } catch (err) {
        console.log(err)
      }
    } else {
      try {
        await unlikePhoto(id)
        this.setState({
          heartColor: 'grey',
          liked: false
        })
      } catch (err) {
        console.log(err)
      }
    }
  }


  render() {
    const { image, title, id } = this.props.photo
    const { heartColor } = this.state
    
    return (
      <div className='image-item tile'>
        <Link to={`/photos/${id}`}><img src={image} alt={title}/></Link>
        <div className='details'>
          <span className='title'>{title}</span>
          <div className='heart-btn-container'>
            <Icon
              name='heart'
              size='big'
              color={heartColor}
              onClick={this.handleClick} />
          </div>
        </div>
      </div>
    )
  }

}

export default ProfilePhotoTile