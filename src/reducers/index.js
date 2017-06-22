import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'
import { reducer as formReducer } from 'redux-form'

import userReducer from './user'
import uiReducer from './ui'

export default combineReducers({
  routing: routerReducer,
  form: formReducer,
  user: userReducer,
  ui: uiReducer
})
