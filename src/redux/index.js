import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'
import { reducer as formReducer } from 'redux-form'

import activeRequestsReducer from './modules/activeRequestsReducer'
import uiReducer from './modules/ui'
import userReducer from './modules/user'

export default combineReducers({
  routing: routerReducer,
  form: formReducer,
  activeRequests: activeRequestsReducer,
  ui: uiReducer,
  user: userReducer
})
