import React from 'react'
import { Icon } from 'semantic-ui-react'
import { likePhoto, unlikePhoto } from '../../../lib/api'

class ProfilePhotoTile extends React.Component {

  state = {
    heartColor: 'grey',
    liked: false
  }

  componentDidMount(){
    // const liked = this.props.photo.liked_by.includes(this.props.currentUserId)

    const likedByArrayIds = this.props.photo.liked_by.map(likedBy => likedBy.id )
    const isLikedByCurrentUser = likedByArrayIds.includes(this.props.currentUserId)

    console.log('PHOTO LIKED BY: ', isLikedByCurrentUser)
    console.log('CURR USR ID: ', this.props.currentUserId)
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
        const res = await likePhoto(id)
        console.log('LIKED!', res)
        this.setState({
          heartColor: 'pink',
          liked: true
        })
      } catch (err) {
        console.log(err)
      }
    } else {
      try {
        const res = await unlikePhoto(id)
        console.log('UNLIKED!', res)
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
    const { image, title } = this.props.photo
    const { heartColor } = this.state
    
    return (
      <div className='image-item tile'>
        <img src={image} />
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