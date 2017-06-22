import Immutable from 'immutable'

import * as uiActions from '../actions/ui'

const initialState = Immutable.fromJS({
  hasApiError: false
})

export default (state = initialState, action) => {
  switch (action.type) {
    case uiActions.API_ERROR:
      return state.merge({
        hasApiError: true
      })
    case uiActions.RESET_ERROR:
      return state.merge({
        hasApiError: false
      })
    default:
      return state
  }
}
