import 'babel-polyfill'
import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { ConnectedRouter, routerMiddleware } from 'react-router-redux'
import createHistory from 'history/createHashHistory'

import './app.scss'
import './icon.font'
import createReduxStore from './store'
import routes from './app/Routes'
import DevTools from './components/DevTools'

const history = createHistory()

const store = createReduxStore(
  window.__INITIAL_STATE__ || {},
  routerMiddleware(history)
)

class App extends Component {
  renderDevTools() {
    return __DEBUG__ ? <DevTools /> : null
  }

  render() {
    return (
      <div className='page-stage'>
        <ConnectedRouter history={history}>
          {routes}
        </ConnectedRouter>
        {this.renderDevTools()}
      </div>
    )
  }
}

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>, document.getElementById('root')
)
