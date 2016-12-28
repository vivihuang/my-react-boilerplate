import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'
import { reducer as formReducer } from 'redux-form'

import activeRequestsReducer from './modules/activeRequestsReducer'

export default combineReducers({
  routing: routerReducer,
  form: formReducer,
  activeRequests: activeRequestsReducer
})
