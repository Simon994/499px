
import React from 'react'
import { Button } from 'semantic-ui-react'
import { Link } from 'react-router-dom'

const Home = () => {

  return (
    <>
      <div className='home-hero'>
        <svg id="layer-1" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1416.99 174.01">
          <g fill="#FFF">
            <path d="M0,280.8S283.66,57,608.94,163.56s437.93,150.75,808,10.34V309.54H0V280.8Z" transform="translate(0 -110.53)" />
          </g>
        </svg>

      </div>
      <section>
        {/* <svg id="Layer_1" data-name="Layer 1" xmlns="http://
        www.w3.org/2000/svg" viewBox="0 0 1416.99 174.01"><defs><style>
            .cls-1{{ fill: '#74c044' }}</style></defs><title>Untitled-4</title>
          <path className="cls-1" d="M0,280.8S283.66,57,608.94,163.56s437.93,150.75,808,10.34V309.54H0V280.8Z"
            transform="translate(0 -135.53)" />
        </svg> */}
      </section>
      <Button as={Link} to='/join'>Sign up</Button>
    </>
  )

}

export default Home