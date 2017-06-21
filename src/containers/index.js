import React, { PropTypes } from 'react'
import { Provider } from 'react-redux'
import { ConnectedRouter } from 'react-router-redux'

import DevTools from '../components/DevTools'

const App = ({ history, store, routes }) => (
  <Provider store={store}>
    <div className='page-stage'>
      <ConnectedRouter history={history}>
        {routes}
      </ConnectedRouter>
      {__DEBUG__ ? <DevTools /> : null}
    </div>
  </Provider>
)

App.propTypes = {
  history: PropTypes.shape({}).isRequired,
  store: PropTypes.shape({}).isRequired,
  routes: PropTypes.shape({}).isRequired
}

export default App
