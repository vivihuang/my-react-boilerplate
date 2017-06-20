import Immutable from 'immutable'
import { handleActions } from 'redux-actions-helper'

import * as userActions from '../actions/user'

const initialState = Immutable.fromJS({
  username: '',
  role: ''
})

export default handleActions({
  [userActions.login.success]: (state, action) => {
    const { username, role } = action.payload
    return state.merge({ username, role })
  },
  [userActions.login.fail]: (state, action) => {
    console.log('fail', action.payload)
    return state
  }
}, initialState)
