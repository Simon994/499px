
import React from 'react'
import { CarouselProvider, Slider, Slide, ButtonBack, ButtonNext } from 'pure-react-carousel'
import { Icon } from 'semantic-ui-react'

import ProfileCard from './ProfileCard'

const PhotosCarousel = (props) => {

  const { profilesSuggestedToFollow, visibleSlides } = props

  return (
    <>
      <div className='profiles-to-follow'>
        <CarouselProvider
          naturalSlideWidth={600}
          naturalSlideHeight={60}
          totalSlides={profilesSuggestedToFollow.length}
          visibleSlides={visibleSlides}
        >
          <div className='container'>
            <Slider >
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

            </Slider>
            <div className='slider-btn-container'>
              <ButtonBack className='buttonBack'><Icon name='chevron circle left' size='big' /></ButtonBack>
              <ButtonNext className='buttonNext'><Icon name='chevron circle right' size='big' /></ButtonNext>
            </div>
          </div>
        </CarouselProvider>
      </div>
    </>
  )
}


export default PhotosCarousel