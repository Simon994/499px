import React from 'react'
import { Icon } from 'semantic-ui-react'

import { getSinglePhoto, getUserProfile, likePhoto, unlikePhoto } from '../../lib/api'

class PhotoShow extends React.Component {

  state = {
    singlePhotoData: null
  }

  async componentDidMount() {
    const photoId = this.props.match.params.id

    const response = await getSinglePhoto(photoId)
    const currentUserProfile = await getUserProfile()
    const currentUserId = currentUserProfile.data.id

    const likedByArrayIds = response.data.liked_by.map(likedBy => likedBy.id )
    const isLikedByCurrentUser = likedByArrayIds.includes(currentUserId)
    const heartColor = isLikedByCurrentUser ? 'pink' : 'grey'

    this.setState({
      singlePhotoData: response.data,
      heartColor,
      liked: isLikedByCurrentUser
    })
  }

  handleClick = async() => {

    const { id } = this.props.match.params
    console.log('GET ID', id)
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

  render(){
    
    if (!this.state.singlePhotoData) return <h1>Just getting that for you</h1>
    
    const { image, title } = this.state.singlePhotoData
    const { username } = this.state.singlePhotoData.owner
    const { heartColor } = this.state

    return (
      <>
        <div className='singlephoto-container'>
          <img src={image}/>
        </div>
        <div className='singlephoto-info-outer'>

          <div className='heart-btn-container'>
            <Icon
              name='heart'
              size='big'
              color={heartColor}
              onClick={this.handleClick} />
          </div>

          <h2>{title}</h2>
          <p>by {username}</p>

        </div>
      </>
    )
  }

}

export default PhotoShow