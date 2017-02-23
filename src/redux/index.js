import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'

import activeRequestsReducer from './modules/activeRequestsReducer'

export default combineReducers({
  routing: routerReducer,
  activeRequests: activeRequestsReducer
})
