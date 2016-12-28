import React from 'react'
import { Route } from 'react-router'
import Layout from './Frame/Layout'
import Frame from './Frame/Frame'
import NotFound from './NotFound'

export default (
  <Route component={Layout}>
    <Route name='default' path='/' component={Frame}>
      <Route path='*' component={NotFound} />
    </Route>
  </Route>
)
