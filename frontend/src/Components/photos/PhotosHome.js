import React from 'react'
import 'pure-react-carousel/dist/react-carousel.es.css'
import { Loader } from 'semantic-ui-react'
import MediaQuery from 'react-responsive'

import PhotosGalleryContainer from './photosSubComponents/PhotosGalleryContainer'
import PhotosCarousel from './photosSubComponents/PhotosCarousel'

import { getProfileIndex, getUserProfile } from '../../lib/api'


class PhotosHome extends React.Component {

  state = {
    createdPhotos: [],
    profilesSuggestedToFollow: [],
    photosByFollowees: [],
    userProfile: {}
  }

  updateOwner = (followee) => {
    return followee.created_photo.map(photo => {
      return {
        ...photo,
        owner: followee.username,
        ownerId: followee.id,
        ownerProfileImage: followee.profile_image
      }
    })
  }

  async componentDidMount() {

    const response = await getProfileIndex()
    const userProfile = await getUserProfile()

    // get photos by people that the user follows
    //(owner information needs to be added into the individual photos)
    const following = userProfile.data.following
    const photosByFollowees = following
      .map(followee => {
        return this.updateOwner(followee)
      })
      .flat()

    //We will make some suggestions for photographers for the user to follow\
    //Splice for profiles that the user does not already follow
    const allProfilesNotFollowing = [...response.data]
    following.forEach(followee => {
      const removeIndex = allProfilesNotFollowing.map(item => item.id).indexOf(followee.id)
      removeIndex && allProfilesNotFollowing.splice(removeIndex, 1)
    })

    //Filter for profiles having 3 or more photos
    const profilesWithPhotos = allProfilesNotFollowing.filter(profile => {
      return (profile.created_photo.length >= 3 && profile.id !== userProfile.data.id)
    })
    const profilesSuggestedToFollow = []

    //limit profile-to-follow suggestions to 10 max. 
    if (profilesWithPhotos.length >= 10) {
      for (let i = 0; i < 10; i++) {
        profilesSuggestedToFollow.push(profilesWithPhotos[i])
      }
    } else {
      profilesWithPhotos.forEach(profile => profilesSuggestedToFollow.push(profile))
    }

    this.setState({
      profilesSuggestedToFollow,
      photosByFollowees,
      userProfile: userProfile.data
    })

  }

  render() {

    const {
      createdPhotos,
      profilesSuggestedToFollow,
      photosByFollowees,
      userProfile } = this.state

    if (!profilesSuggestedToFollow.length) return <Loader active inline='centered' />


    return (
      <>
        <h1 className='homefeed-title'>Home Feed</h1>
        <p className='homefeed-intro'>See photos and published Galleries from people you follow.</p>
        <section className='homefeed-content'>
          <div className='members-ad-container'>
            <div className='members-ad'>
              <div className='members-ad-text'>
                <h1 className='members-ad-title'>Members get more.</h1>
                <p>Membership is not available on this clone, but if it were, it would start at $2.99/month</p>
              </div>
            </div>
          </div>
          <div className='featured-follow-explainer'>
            <h4>Featured photographers</h4>
            <p>Follow to explore new work</p>
          </div>

          <MediaQuery minDeviceWidth={1300}>
            {(matches) => {
              if (matches) {
                return <PhotosCarousel
                  visibleSlides={3.5}
                  {...this.state}
                />
              } else {
                return <PhotosCarousel
                  visibleSlides={1}
                  {...this.state}
                />
              }
            }
            }
          </MediaQuery>


          <PhotosGalleryContainer
            followeePhotos={photosByFollowees}
            ownerPhotos={createdPhotos}
            userProfile={userProfile}
          />

        </section>
      </>
    )
  }
}

export default PhotosHome