import React from 'react'
import { Switch, Route } from 'react-router-dom'
import Layout from './Frame/Layout'
import Frame from './Frame/Frame'
import NotFound from './NotFound'

export default (
  <Route>
    <Layout>
      <Route path='/'>
        <Frame>
          <Switch>
            <Route component={NotFound} />
          </Switch>
        </Frame>
      </Route>
    </Layout>
  </Route>
)
