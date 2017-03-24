import Immutable from 'immutable'
import { listenActions } from 'redux-actions-helper'

const initialState = Immutable.fromJS({
  token: null
})

export default listenActions((on) => {
  on('', () => {})
}, initialState)
