import 'rxjs'
import React from 'react'
import { render } from 'react-dom'
import { routerMiddleware } from 'react-router-redux'
import createHistory from 'history/createBrowserHistory'

import configureStore from './store'
import routes from './routes'
import App from './containers'

import './icon.font'
import './index.scss'

const history = createHistory()

const store = configureStore(
  window.__INITIAL_STATE__ || {},
  routerMiddleware(history)
)

const AppComponent = <App history={history} store={store} routes={routes} />
const root = document.getElementById('root')

if (__DEBUG__) {
  const RedBox = require('redbox-react').default // eslint-disable-line global-require
  try {
    render(AppComponent, root)
  } catch (e) {
    render(<RedBox error={e} />, root)
  }
} else {
  render(AppComponent, root)
}
