import { isObject } from 'lodash'

import REST_API from './REST-API'

export default (action) => {
  const payload = action.payload

  return payload &&
    isObject(payload) &&
    Object.keys(payload).length === 1 &&
    payload[REST_API]
}
