import { handleActions } from 'redux-actions'
import { isFunction, forEach } from 'lodash'

export default (actionFunction, initialState) => {
  const handlers = {}

  function getActionName(actionCreator) {
    return (isFunction(actionCreator) && actionCreator.toString)
      ? actionCreator.toString()
      : actionCreator
  }

  function mergeHandlers(actionName, handler) {
    return Object.assign(handlers, {
      [actionName]: handler
    })
  }

  function on(actionCreator, handler) {
    mergeHandlers(getActionName(actionCreator), handler)
  }

  const method = ['success', 'fail', 'finally']

  forEach(method, (name) => {
    on[name] = (actionCreator, handler) => {
      mergeHandlers(`${getActionName(actionCreator)}__${name.toUpperCase()}`, handler)
    }
  })

  actionFunction(on)

  return handleActions(handlers, initialState)
}
