import { createAction } from 'redux-actions-helper'
import Deferred from '../../utils/Deferred'

export const confirm = createAction(
  'confirm', () => new Deferred(), (content, title = null) => ({
    title,
    content
  })
)

export const alert = createAction(
  'alert', () => new Deferred(), (content, title = null) => ({
    title,
    content
  })
)

export const removeToast = createAction('removeToast')

export const toast = createAction(
  'toast', (content, title = null, time = 2500) => ({
    title,
    content,
    time
  })
)
