import 'babel-polyfill'
import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { Router, hashHistory, useRouterHistory } from 'react-router'
import { syncHistoryWithStore } from 'react-router-redux'
import createHistory from 'history/lib/createHashHistory'

import './app.scss'
import './icon.font'
import createReduxStore from './store'
import routes from './app/Routes'
import DevTools from './components/DevTools'

const store = createReduxStore(
  window.__INITIAL_STATE__ || {},
  hashHistory
)

const history = syncHistoryWithStore(
  useRouterHistory(createHistory)({ routes }),
  store
)

class App extends Component {
  renderDevTools() {
    return __DEBUG__ ? <DevTools /> : null
  }

  render() {
    return (
      <div className='page-stage'>
        <Router history={history} routes={routes} />
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
