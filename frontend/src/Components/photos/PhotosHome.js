import React from 'react'
import { CarouselProvider, Slider, Slide, ButtonBack, ButtonNext } from 'pure-react-carousel'
import 'pure-react-carousel/dist/react-carousel.es.css'

import ProfileCard from './photosSubComponents/ProfileCard'
import PhotosGalleryContainer from './photosSubComponents/PhotosGalleryContainer'

import { createPhoto, getProfileIndex, getUserProfile } from '../../lib/api'
import { setAvatar } from '../../lib/assets'

class PhotosHome extends React.Component {

  state = {
    createdPhotos: [],
    profilesSuggestedToFollow: [],
    photosByFollowees: []
  }

  updateOwner = (followee) => {
    return followee.created_photo.map(photo => {
      return { ...photo, owner: followee.username }
    })
  }

  async componentDidMount() {

    const response = await getProfileIndex()

    // get user's personal profile
    const userProfile = await getUserProfile()
    console.log('PROFILE', userProfile.data)
    //Set avatar image in local storage, for use on Navbar
    setAvatar(userProfile.data.profile_image)

    // get photos by people that the user follows
    //(owner information needs to be added into the individual photos)
    const following = userProfile.data.following
    const photosByFollowees = following
      .map(followee => {
        return this.updateOwner(followee)
      })
      .flat()

    //We will make some suggestions for photographers for the user to follow\
    //Filter for profiles having 3 or more photos
    const profilesWithPhotos = response.data.filter(profile => {
      return profile.created_photo.length >= 3
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
      createdPhotos: userProfile.data.created_photo,
      profilesSuggestedToFollow,
      photosByFollowees
    })

  }

  render() {
    const { createdPhotos ,profilesSuggestedToFollow, photosByFollowees } = this.state
    console.log(profilesSuggestedToFollow.length)
    return (
      <>
        <h1>Photos Home</h1>
        <div className='profiles-to-follow'>
          <CarouselProvider
            naturalSlideWidth={100}
            naturalSlideHeight={125}
            totalSlides={profilesSuggestedToFollow.length}
            visibleSlides={3}
          >
            <div className='container'>
              <Slider>
                {
                  profilesSuggestedToFollow.map((profile, index) => {
                    return (
                      <Slide key={index} index={index} className='slide'>
                        <ProfileCard
                          key={profile.id}
                          created_photo={profile.created_photo}
                          username={profile.username}
                          profileImage={profile.profile_image}
                          {...profile}
                        />
                      </Slide>
                    )
                  })
                }

                <ButtonBack className='buttonBack'>Back</ButtonBack>
                <ButtonNext className='buttonNext'>Next</ButtonNext>
              </Slider>
            </div>
          </CarouselProvider>
        </div>
        
        <PhotosGalleryContainer
          followeePhotos={photosByFollowees}
          ownerPhotos={createdPhotos}
        />

      </>
    )
  }
}

export default PhotosHome