import Immutable from 'immutable'
import { uniqueId } from 'lodash'
import chai from 'chai'
chai.use(require('chai-shallow-deep-equal'))

import { MODAL_TYPE } from '../../constants/ui'
import { confirm, alert, toast, removeToast } from '../actions/ui'
import uiReducer from './ui'

const expect = chai.expect

describe('ui reducer', () => {
  const initialState = Immutable.fromJS({
    modal: {
      show: false
    },
    toast: {}
  })

  it('should have confirm in state', () => {
    const title = 'This is a confirm box.'
    const content = 'Are you sure you want to go?'
    const actual = uiReducer(initialState, confirm(content, title))
    const expected = {
      modal: {
        title,
        content,
        show: true,
        type: MODAL_TYPE.CONFIRM,
        confirm: () => {},
        cancel: () => {}
      },
      toast: {}
    }
    expect(actual.toJS()).to.shallowDeepEqual(expected)
  })

  it('should have alert in state', () => {
    const title = 'This is a alert box.'
    const content = 'Alert something.'
    const actual = uiReducer(initialState, alert(content, title))
    const expected = {
      modal: {
        title,
        content,
        show: true,
        type: MODAL_TYPE.ALERT,
        confirm: () => {},
        cancel: () => {}
      },
      toast: {}
    }
    expect(actual.toJS()).to.shallowDeepEqual(expected)
  })

  it('should have toast in state', () => {
    const title = 'This is a toast box.'
    const content = 'Toast something.'
    const toastId = '2'
    const actual = uiReducer(initialState, toast(content, title))
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
    expect(actual.toJS()).to.shallowDeepEqual(expected)
  })

  it('should remove toast in state', () => {
    const title = 'This is a toast box.'
    const content = 'Toast something.'
    const toastId = '2'
    const previousState = uiReducer(initialState, toast(content, title))
    const actual = uiReducer(previousState, removeToast(toastId))
    const expected = {
      modal: {
        show: false
      },
      toast: {}
    }
    expect(actual.toJS()).to.shallowDeepEqual(expected)
  })
})
