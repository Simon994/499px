/* eslint-disable camelcase */
import React from 'react'

class ProfileCard extends React.Component {

  state = {
    photosToDisplay: [],
    username: ''
  }

  componentDidMount(){
    const { created_photo, username } = this.props
    
    const photosToDisplay = created_photo.slice(0,3)
    
    this.setState({
      photosToDisplay,
      username
    })

  }

  render(){
    const { photosToDisplay } = this.state

    return (
      <div className='profile-card-outer'> Test
        {photosToDisplay.map(photo => {
          return <img 
            key={photo.id}
            src={photo.image}
            alt='from user profile'
          />
        })}
      </div>
    )
  }

}

export default ProfileCard