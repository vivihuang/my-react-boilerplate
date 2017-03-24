import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'

import activeRequestsReducer from './modules/activeRequestsReducer'
import uiReducer from './modules/ui'
import userReducer from './modules/user'

export default combineReducers({
  routing: routerReducer,
  activeRequests: activeRequestsReducer,
  ui: uiReducer,
  user: userReducer
})
