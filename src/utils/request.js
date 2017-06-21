import { ajax } from 'rxjs/observable/dom/ajax'
import config from 'config'

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
  }).map(res => res.response)
}
