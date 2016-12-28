import { isRestApi, REST_API } from '../../base_modules/api-middleware'

const authMiddleware = ({ getState }) => next => (action) => {
  if (isRestApi(action)) {
    const payload = action.payload

    const apiHeaders = payload[REST_API].headers

    let authHeads = {}

    const token = getState().user.get('token')

    if (token) {
      authHeads = {
        'X-Auth-Token': token,
        ...authHeads
      }
    }

    payload[REST_API].method = payload[REST_API].method || 'GET'

    payload[REST_API].headers = {
      'content-type': 'application/json',
      ...authHeads,
      ...apiHeaders
    }
  }

  return next(action)
}

export default authMiddleware
