import Immutable from 'immutable'
import { handleActions } from 'redux-actions-helper'

import * as userActions from '../actions/user'

const initialState = Immutable.fromJS({
  username: '',
  role: ''
})

export default handleActions({
  [userActions.login.success]: (state, action) => {
    console.log('success', action.payload)
    return state
  },
  [userActions.login.fail]: (state, action) => {
    console.log('fail', action.payload)
    return state
  }
}, initialState)
