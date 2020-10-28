/* eslint-disable camelcase */
import React from 'react'
import { Button, Loader } from 'semantic-ui-react'

import ProfilePhotoTile from './photosSubComponents/ProfilePhotoTile'
import { getPublicUserProfile, getUserProfile, followProfile, unfollowProfile } from '../../lib/api'


class PhotosProfile extends React.Component {

  state = {
    userProfile: null,
    heartColor: 'grey',
    liked: false,
    currentUserId: null,
    isCurrentUser: null,
    isFollowedByCurrentUser: null
  }

  setProfileInfo = async () => {
    const userId = this.props.match.params.id
    const userProfile = await getPublicUserProfile(userId)
    const currentUserProfile = await getUserProfile()

    const currentUserId = currentUserProfile.data.id
    const isCurrentUser = currentUserId === userProfile.data.id

    const isFollowedByCurrentUser = userProfile.data.followed_by.some(followee => {
      return followee.id === currentUserId
    })

    this.setState({
      userProfile: userProfile.data,
      currentUserId,
      isCurrentUser,
      isFollowedByCurrentUser
    })
  }


  async componentDidMount() {
    this.setProfileInfo()
  }

  componentDidUpdate(prevProps) {
    if (this.props.match.params.id !== prevProps.match.params.id){
      this.setProfileInfo()
    }
  }


  handleClick = () => {

    if (this.state.isFollowedByCurrentUser){
      this.handleUnfollowClick()
    } else {
      this.handleFollowClick()
    }

  }


  handleFollowClick = async () => {
    try {
      const response = await followProfile(this.state.userProfile.id)

      if (response.status === 202) {

        this.setState({
          isFollowedByCurrentUser: true
        })
      } else {
        throw new Error()
      }
    } catch (err) {
      console.error(err)
    }
  }

  handleUnfollowClick = async () => {
    try {
      const response = await unfollowProfile(this.state.userProfile.id)
      if (response.status === 202) {

        this.setState({
          isFollowedByCurrentUser: false
        })
      } else {
        throw new Error()
      }
    } catch (err) {
      console.error(err)
    }
  }


  render() {

    if (!this.state.userProfile) return <Loader active inline='centered' />

    const { profile_image,
      first_name,
      last_name,
      following,
      created_photo } = this.state.userProfile
    
    const { currentUserId, isCurrentUser, isFollowedByCurrentUser } = this.state
    const bannerBackground = created_photo[0].image

    return (
      <>
        <div className='profile-banner-img' style={{ backgroundImage: `url(${bannerBackground})` }}></div>
        <div className='profile-summary-info'>
          <div className='profile-avatar-container'>
            <img
              src={profile_image}
              alt="selected"
              style={{ borderRadius: '50%', width: '90px', height: '90px', objectFit: 'cover' }}
            />
          </div>
          <h1>{first_name} {last_name}</h1>
          {!isCurrentUser &&
            <Button 
              className={`lozenge ${isFollowedByCurrentUser ? 'is-following' : 'not-following'}`}
              onClick={this.handleClick}
            >
              {isFollowedByCurrentUser ? 'Following' : 'Follow'}
            </Button>
          }
          <div>
            <p>{following.length} following</p>
          </div>
        </div>

        <div className='image-grid-outer'>
          <div className='image-grid tiles' style={{ marginTop: '30px' }}>
            {created_photo.map((photo, index) => {
              return (
                <ProfilePhotoTile 
                  photo={photo}
                  key={index}
                  currentUserId={currentUserId}/>
              )
            })}
          </div>
        </div>

      </>
    )
  }

}

export default PhotosProfile