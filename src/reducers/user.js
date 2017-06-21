import Immutable from 'immutable'

import * as userActions from '../actions/user'

const initialState = Immutable.fromJS({
  username: '',
  role: ''
})

export default (state = initialState, action) => {
  switch (action.type) {
    case userActions.LOGIN_SUCCESS:
      return state.merge({
        username: action.payload.username || '',
        role: action.payload.role || ''
      })
    default:
      return state
  }
}
