import React from 'react'
import { Switch, Route } from 'react-router-dom'
import Layout from './containers/Frame/Layout'
import Frame from './containers/Frame/Frame'
import AuthenticatedComponent from './containers/Frame/AuthenticatedComponent'
import Homepage from './containers/Homepage'
import Login from './containers/Login'
import NotFound from './containers/NotFound'

export default (
  <Layout>
    <Switch>
      <Route path='/login' component={AuthenticatedComponent(Login, { auth: false })} />
      <Route
        path='/'
        render={() => {
          const AuthFrame = AuthenticatedComponent(Frame)
          return (<AuthFrame>
            <Switch>
              <Route exact path='/' component={Homepage} />
              <Route component={NotFound} />
            </Switch>
          </AuthFrame>)
        }}
      />
    </Switch>
  </Layout>
)
