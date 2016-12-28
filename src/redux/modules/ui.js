import Immutable from 'immutable'
import { uniqueId } from 'lodash'

import { MODAL_TYPE } from '../../constants/ui'
import { handleActions } from '../../../base_modules/redux-actions'
import * as uiActions from '../actions/ui'

const initialState = Immutable.fromJS({
  modal: {
    show: false
  },
  toast: {}
})


export default handleActions((on) => {
  on(uiActions.confirm, (state, action) =>
    state.mergeIn(['modal'], {
      ...action.meta,
      show: true,
      type: MODAL_TYPE.CONFIRM,
      confirm: action.payload.resolve,
      cancel: action.payload.reject
    }))

  on(uiActions.alert, (state, action) =>
    state.mergeIn(['modal'], {
      ...action.meta,
      show: true,
      type: MODAL_TYPE.ALERT,
      confirm: action.payload.resolve,
      cancel: action.payload.reject
    }))

  on(uiActions.toast, (state, action) => {
    const toastId = uniqueId()
    return state.mergeIn(['toast', toastId], {
      toastId,
      ...action.payload
    })
  })

  on(uiActions.removeToast, (state, action) => {
    const toastId = action.payload[0]
    return state.deleteIn(['toast', toastId])
  })
}, initialState)
