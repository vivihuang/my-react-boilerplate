import 'isomorphic-fetch'
import REST_API from './REST-API'
import isRestApi from './isRestApi'

export default () => next => (action) => {
  if (!isRestApi(action)) {
    return next(action)
  }

  const payload = action.payload

  const API = payload[REST_API]
  const { endpoint, headers } = API
  const { method, body, credentials } = API

  const api = fetch(endpoint, {
    method,
    body,
    credentials,
    headers
  })

  const parseJSON = (response) => {
    const contentType = response.headers.get('content-type')
    if (contentType && contentType.indexOf('application/json') >= 0) {
      return response.json()
    }
    return response.text()
  }

  const checkStatus = (response) => {
    if (response.ok) {
      return parseJSON(response)
    }
    return response.json().then(
      error => Promise.reject({ ...error, status: response.status })
    )
  }

  return next({
    ...action,
    payload: api.then(checkStatus),
    meta: {
      ...action.meta,
      API_ACTION: { ...API, API_REQUEST_START: true }
    }
  })
}
