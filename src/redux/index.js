import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'

import activeRequestsReducer from './modules/activeRequestsReducer'
import uiReducer from './modules/ui'

export default combineReducers({
  routing: routerReducer,
  activeRequests: activeRequestsReducer,
  ui: uiReducer
})
