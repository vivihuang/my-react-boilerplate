import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'
import { reducer as formReducer } from 'redux-form'

import activeRequestsReducer from './activeRequestsReducer'
import uiReducer from './ui'
import userReducer from './user'

export default combineReducers({
  routing: routerReducer,
  form: formReducer,
  activeRequests: activeRequestsReducer,
  ui: uiReducer,
  user: userReducer
})
