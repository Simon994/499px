
import React from 'react'
import { Button, Icon } from 'semantic-ui-react'
import { Link } from 'react-router-dom'

const Home = () => {

  return (
    <>
      <div className='home-hero'>
        
        <div className='hero-text-container'>
          <h1 className='hero-title'>Discover and share photos:<br />With 499<sup>px</sup>, a 500<sup>px</sup> clone</h1>
          <p className='hero-sub'>This is a clone of the website 500px.</p>
          <Button className='lozenge' as={Link} to='/join'>Sign up</Button>
        </div>
        
        <svg id="layer-1" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1416.99 174.01">
          <g fill="#FFF">
            <path d="M0,280.8S283.66,57,608.94,163.56s437.93,150.75,808,10.34V309.54H0V280.8Z" transform="translate(0 -135.53)" />
          </g>
        </svg>
        <p id='hero-image-credit'>Photo by Patrick Fore on Unsplash</p>
      </div>

      <div className='home-details'>
        <h1>What makes us the same</h1>
        <div className='home-details-text'>
          <div className='detail-tile'>
            <Icon name='clone outline' size='huge'/>
            <h3>Style and feel</h3>
            <p>I am tring to emulate as much as possible
              to the style and feel. 
              This is an ongoing effort to
              improve my skills with both React and Sass.
            </p>
          </div>
          <div className='detail-tile'>
            <Icon name='address card outline' size='huge'/>
            <h3>Discover and post</h3>
            <p>You can post photos, browse photos by others, and follow photographers.
              Photos from those you follow will then appear in your home feed.
            </p>
          </div>
          <div className='detail-tile'>
            <Icon name='github' size='huge'/>
            <h3>Take a look on github</h3>
            <p>This is an ongoing project. Take a look at the code on <a href="https://github.com/Simon994/RAWShot" target='blank'>github</a>. 
            </p>
          </div>

        </div>
      </div>

    </>
  )

}

export default Home