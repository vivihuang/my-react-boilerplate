import React from 'react'
import { Switch, Route } from 'react-router-dom'
import Layout from './Frame/Layout'
import Frame from './Frame/Frame'
import AuthenticatedComponent from './Frame/AuthenticatedComponent'
import Homepage from './Homepage'
import Login from './Login'
import NotFound from './NotFound'

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
