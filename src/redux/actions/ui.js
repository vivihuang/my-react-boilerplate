import { createActionPrefix, createAction } from '../../../base_modules/redux-actions'
import Deferred from '../../utils/Deferred'

const actionTypeCreator = createActionPrefix(__filename)

export const confirm = createAction(
  actionTypeCreator('confirm'), () => new Deferred(), (content, title = null) => ({
    title,
    content
  })
)

export const alert = createAction(
  actionTypeCreator('alert'), () => new Deferred(), (content, title = null) => ({
    title,
    content
  })
)

export const removeToast = createAction(
  actionTypeCreator('removeToast')
)

export const toast = createAction(
  actionTypeCreator('toast'), (content, title = null, time = 2500) => ({
    title,
    content,
    time
  })
)
