
import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import Notifications from 'react-notify-toast'

import Navbar from './components/common/Navbar'
import Home from './components/common/Home'
import Join from './components/auth/Join'
import Signup from './components/auth/Signup'
import GetToKnow from './components/auth/GetToKnow'
import Login from './components/auth/Login'
import PhotosHome from './components/photos/PhotosHome'
import PhotosUpload from './components/photos/PhotosUpload'
import PhotosSubmit from './components/photos/PhotoSubmit'
import PhotosProfile from './components/photos/PhotosProfile'
import PhotoShow from './components/photos/PhotoShow'
import PhotosLiked from './components/photos/PhotosLiked'

const App = () => {

  return (
    <>
      <BrowserRouter>
        <Notifications />
        <Navbar />

        <Switch>
          <Route exact path='/' component={Home} />
          <Route exact path='/join' component={Join} />
          <Route exact path='/signup' component={Signup} />
          <Route exact path='/gettoknow' component={GetToKnow} />
          <Route exact path='/login' component={Login} />
          <Route exact path='/liked' component={PhotosLiked} />
          <Route path='/photoshome' component={PhotosHome} />
          <Route path='/upload' component={PhotosUpload} />
          <Route path='/submitphoto' component={PhotosSubmit} />
          <Route path='/profile/:id' component={PhotosProfile} />
          <Route path='/photos/:id' component={PhotoShow} />

        </Switch>
      </BrowserRouter>
    </>
  )

}

export default App


