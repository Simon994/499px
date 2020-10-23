
import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'

import Home from './Components/common/Home'
import Join from './Components/auth/Join'
import Signup from './Components/auth/Signup'
import GetToKnow from './Components/auth/GetToKnow'
import Login from './Components/auth/Login'
import PhotosHome from './Components/photos/PhotosHome'

const App = () => {

  return (
    <>
      <BrowserRouter>
        <Switch>
          <Route exact path='/' component={Home} />
          <Route exact path='/join' component={Join} />
          <Route exact path='/signup' component={Signup} />
          <Route exact path='/gettoknow' component={GetToKnow} />
          <Route exact path='/login' component={Login} />
          <Route path = '/photoshome' component={PhotosHome} />

        </Switch>
      </BrowserRouter>
    </>
  )

}

export default App


