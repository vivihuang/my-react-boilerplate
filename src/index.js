import React from 'react'
import ReactDOM from 'react-dom'
import { routerMiddleware } from 'react-router-redux'
import createHistory from 'history/createHashHistory'
import { AppContainer } from 'react-hot-loader'
import Redbox from 'redbox-react'

import createReduxStore from './store'
import routes from './app/Routes'
import App from './app'

const history = createHistory()

const store = createReduxStore(
  window.__INITIAL_STATE__ || {},
  routerMiddleware(history)
)

const consoleErrorReporter = ({ error }) => {
  console.error(error) // eslint-disable-line no-console
  return <Redbox error={error} />
}

consoleErrorReporter.propTypes = {
  error: React.PropTypes.instanceOf(Error).isRequired
}

const render = (Component) => {
  ReactDOM.render(
    <AppContainer errorReporter={consoleErrorReporter}>
      <Component history={history} store={store} routes={routes} />
    </AppContainer>, document.getElementById('root')
  )
}

render(App)

if (module.hot) {
  module.hot.accept('./app', () => { render(App) })
}
