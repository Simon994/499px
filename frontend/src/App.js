
import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'

import Navbar from './Components/common/Navbar'
import Home from './Components/common/Home'
import Join from './Components/auth/Join'
import Signup from './Components/auth/Signup'
import GetToKnow from './Components/auth/GetToKnow'
import Login from './Components/auth/Login'
import PhotosHome from './Components/photos/PhotosHome'
import PhotosUpload from './Components/photos/PhotosUpload'
import PhotosSubmit from './Components/photos/PhotoSubmit'

const App = () => {

  return (
    <>
      <BrowserRouter>
        <Navbar />
        
        <Switch>
          <Route exact path='/' component={Home} />
          <Route exact path='/join' component={Join} />
          <Route exact path='/signup' component={Signup} />
          <Route exact path='/gettoknow' component={GetToKnow} />
          <Route exact path='/login' component={Login} />
          <Route path = '/photoshome' component={PhotosHome} />
          <Route path = '/upload' component={PhotosUpload} />
          <Route path = '/submitphoto' component={PhotosSubmit} />
          
        </Switch>
      </BrowserRouter>
    </>
  )

}

export default App


