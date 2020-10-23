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

    return (
      <>
        <h1>Photos Home</h1>
        <div className='profiles-to-follow'>
          <CarouselProvider
            naturalSlideWidth={100}
            naturalSlideHeight={125}
            totalSlides={2}
            visibleSlides={2}
          >
            <Slider>
              {
                profilesSuggestedToFollow.map((profile, index) => {
                  return (
                    <Slide key={index} index={index}>
                      <ProfileCard
                        key={profile.id}
                        created_photo={profile.created_photo}
                        username={profile.username}
                      />
                    </Slide>
                  )
                })
              }


            </Slider>
          </CarouselProvider>
        </div>
        <CarouselProvider
          naturalSlideWidth={100}
          naturalSlideHeight={125}
          totalSlides={3}
          visibleSlides={2}
        >
          <Slider>
            <Slide index={0}>I am the first Slide.</Slide>
            <Slide index={1}>I am the second Slide.</Slide>
            <Slide index={2}>I am the third Slide.</Slide>
          </Slider>
          <ButtonBack>Back</ButtonBack>
          <ButtonNext>Next</ButtonNext>
        </CarouselProvider>
      </>
    )
  }
}

export default PhotosHome