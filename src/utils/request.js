import { ajax } from 'rxjs/observable/dom/ajax'
import { Observable } from 'rxjs/Observable'
import config from 'config'

import { loginSuccess } from '../actions/user'
import { hasApiError, resetError } from '../actions/ui'

export const request = (url, options = {}) => {
  const { body } = options
  const endpoint = config.api ? `/${config.api}/${url}` : `/${url}`
  const method = options.method || 'GET'

  const headers = { ...options.headers, 'Content-Type': 'application/json' }

  return ajax({
    url: endpoint,
    method,
    body,
    headers,
    responseType: 'json',
    withCredentials: true
  }).mergeMap(res => Observable.merge(
    Observable.of(resetError()),
    Observable.of(loginSuccess(res.response))
  )).catch(error => Observable.of(hasApiError(error.status)))
}
