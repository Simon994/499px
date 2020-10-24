import React from 'react'

class PhotoSubmit extends React.Component {

  state = {
    image: ''
  }

  componentDidMount(){
    const { image } = this.props.location.state
    console.log(image)
    this.setState({
      image
    })
  }

  render(){
    
    if (!this.state.image) return <h1>Just getting that for you</h1>

    return (
      <h1>SUBMIT HERE</h1>
    )
  }

}

export default PhotoSubmit