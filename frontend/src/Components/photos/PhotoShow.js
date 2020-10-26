import React from 'react'

import { getSinglePhoto } from '../../lib/api'

class PhotoShow extends React.Component {

  state = {
    singlePhotoData: null
  }

  async componentDidMount() {
    const photoId = this.props.match.params.id

    const response = await getSinglePhoto(photoId)
    console.log('HERE IS SINGLE PHOTO INFO', response)

    this.setState({
      singlePhotoData: response.data
    })
  }


  render(){
    
    if (!this.state.singlePhotoData) return <h1>Just getting that for you</h1>
    
    return (
      <h1>SHOWing photo</h1>
    )
  }

}

export default PhotoShow