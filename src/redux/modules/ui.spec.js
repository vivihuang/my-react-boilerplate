import test from 'ava'
import Immutable from 'immutable'

import { MODAL_TYPE } from '../../constants/ui'
import { confirm, alert, toast, removeToast } from '../actions/ui'
import uiReducer from './ui'

const initialState = Immutable.fromJS({
  modal: {
    show: false
  },
  toast: {}
})

test('should have confirm in state', t => {
  const title = 'This is a confirm box.'
  const content = 'Are you sure you want to go?'
  const confirmState = uiReducer(initialState, confirm(content, title))
  const actual = confirmState.deleteIn(['modal', 'confirm']).deleteIn(['modal', 'cancel']).toJS()
  const expected = {
    modal: {
      title,
      content,
      show: true,
      type: MODAL_TYPE.CONFIRM
    },
    toast: {}
  }
  t.deepEqual(actual, expected)
})

test('should have alert in state', t => {
  const title = 'This is a alert box.'
  const content = 'Alert something.'
  const alertState = uiReducer(initialState, alert(content, title))
  const actual = alertState.deleteIn(['modal', 'confirm']).deleteIn(['modal', 'cancel']).toJS()
  const expected = {
    modal: {
      title,
      content,
      show: true,
      type: MODAL_TYPE.ALERT
    },
    toast: {}
  }
  t.deepEqual(actual, expected)
})

test('should have toast in state', t => {
  const title = 'This is a toast box.'
  const content = 'Toast something.'
  const actual = uiReducer(initialState, toast(content, title)).toJS()
  const toastId = Object.keys(actual.toast)[0]
  const expected = {
    modal: {
      show: false
    },
    toast: {
      [toastId]: {
        toastId,
        title,
        content,
        time: 2500
      }
    }
  }
  t.deepEqual(actual, expected)
})

test('should remove toast in state', t => {
  const title = 'This is a toast box.'
  const content = 'Toast something.'
  const previousState = uiReducer(initialState, toast(content, title))
  const toastId = Object.keys(previousState.toJS().toast)[0]
  const actual = uiReducer(previousState, removeToast(toastId))
  const expected = {
    modal: {
      show: false
    },
    toast: {}
  }
  t.deepEqual(actual.toJS(), expected)
})
