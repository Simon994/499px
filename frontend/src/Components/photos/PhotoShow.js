/* eslint-disable camelcase */
import React from 'react'
import { Icon, Comment, Form, Button } from 'semantic-ui-react'

import { getSinglePhoto, getUserProfile, likePhoto, unlikePhoto, createComment } from '../../lib/api'
import { isAuthenticated } from '../../lib/auth'

class PhotoShow extends React.Component {

  state = {
    singlePhotoData: null,
    formText: '',
    postBtnHidden: true
  }

  async componentDidMount() {
    const photoId = this.props.match.params.id

    const response = await getSinglePhoto(photoId)
    const currentUserProfile = await getUserProfile()
    const currentUserId = currentUserProfile.data.id

    const likedByArrayIds = response.data.liked_by.map(likedBy => likedBy.id)
    const isLikedByCurrentUser = likedByArrayIds.includes(currentUserId)
    const heartColor = isLikedByCurrentUser ? 'pink' : 'grey'

    this.setState({
      singlePhotoData: response.data,
      heartColor,
      liked: isLikedByCurrentUser
    })
  }

  handleClick = async () => {

    const { id } = this.props.match.params
    console.log('GET ID', id)
    const { liked } = this.state

    if (!liked) {
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

  handleTextChange = (e) => {
    const formText = e.target.value
    this.setState({
      formText
    })
  }

  handleTextBoxClick = () => {
    this.setState({
      postBtnHidden: false
    })
  }

  handleCancelClick = () => {
    this.setState({
      postBtnHidden: true
    })
  }

  handleCommentSubmit = async () => {
    const formData = {
      text: this.state.formText,
      photo: this.state.singlePhotoData.id
    }

    try {
      const resCreateComment = await createComment(formData)

      if (resCreateComment.status === 201 ){
        const photoId = this.props.match.params.id
        const response = await getSinglePhoto(photoId)

        this.setState({
          singlePhotoData: response.data,
          formText: ''
        })
      } 
    } catch (err) {
      console.log(err)
    }
  }

  render() {

    if (!this.state.singlePhotoData) return <h1>Just getting that for you</h1>

    const { image, title, comments } = this.state.singlePhotoData
    const { username, profile_image } = this.state.singlePhotoData.owner
    const { heartColor, formText, postBtnHidden } = this.state


    return (
      <>
        <div className='singlephoto-container'>
          <img src={image} />
        </div>
        <div className='singlephoto-info-outer'>
          <div className='singlephoto-owner-avatar'>
            <img src={profile_image} style={{ borderRadius: '50%', width: '50px' }} />
          </div>
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

        <Comment.Group>

          {isAuthenticated() &&
            <Form >
              <Form.Input
                onClick={this.handleTextBoxClick}
                onChange={this.handleTextChange}
                value={formText}
                placeholder={'💬   Add a comment'} />
              <div className={`comment-btns-container ${postBtnHidden ? 'hidden-btns' : 'show-btns'}`}>
                <Button 
                  className='cancel-btn'
                  onClick={this.handleCancelClick}
                >
                  Cancel
                </Button>
                <Button primary
                  className='lozenge'
                  onClick={this.handleCommentSubmit}
                >
                  Post
                </Button>
              </div>
            </Form>
          }

          <p>{comments.length} comments</p>
          {!comments.length &&
            <>
              <Icon name='comment outline' size='big' />
              <br />
              <br />
              <p>No comments yet</p>
            </>
          }
          {comments.map((comment, index) => {
            return (
              <Comment key={index}>
                <Comment.Avatar src={comment.owner.profile_image} />
                <Comment.Author>{comment.owner.username}</Comment.Author>
                <Comment.Text>{comment.text}</Comment.Text>
              </Comment>
            )
          })
          }


        </Comment.Group>

      </>
    )
  }

}

export default PhotoShow