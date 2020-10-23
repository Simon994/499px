import React from 'react'
import { CarouselProvider, Slider, Slide, ButtonBack, ButtonNext } from 'pure-react-carousel'
import 'pure-react-carousel/dist/react-carousel.es.css'

import ProfileCard from './photosSubComponents/ProfileCard'

import { getProfileIndex } from '../../lib/api'

class PhotosHome extends React.Component {

  state = {
    profilesSuggestedToFollow: []
  }

  async componentDidMount() {

    const response = await getProfileIndex()

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
      profilesSuggestedToFollow
    })

  }

  render() {
    const { profilesSuggestedToFollow } = this.state
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

      </>
    )
  }
}

export default PhotosHome