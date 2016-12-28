import { isFSA } from 'flux-standard-action'
import { omit } from 'lodash'

function isPromise(val) {
  return val && typeof val.then === 'function'
}

function isDeferred(val) {
  return val && val.promise && typeof val.promise.then === 'function'
}

function getMeta(action) {
  return (action.meta && action.meta.API_ACTION)
    ? {
      ...action.meta,
      API_ACTION: {
        ...omit(action.meta.API_ACTION, 'API_REQUEST_START'),
        API_REQUEST_FINISH: true
      }
    }
    : null
}

export default ({ dispatch }) => next => (action) => {
  if (!isFSA(action)) {
    return next(action)
  }

  next(action)

  if (isPromise(action.payload)) {
    action.payload.then((result) => {
      dispatch({
        ...action,
        payload: result,
        type: `${action.type}__SUCCESS`,
        meta: getMeta(action)
      })
    }).catch((error) => {
      dispatch({
        ...action,
        error: true,
        payload: error,
        type: `${action.type}__FAIL`,
        meta: getMeta(action)
      })
    })

    return action.payload
  } else if (isDeferred(action.payload)) {
    return action.payload.promise
  }
  return null
}
