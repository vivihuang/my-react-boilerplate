import { REST_API } from '../middlewares/api-middleware'

export const login = data => ({
  [REST_API]: {
    endpoint: '/api/login',
    method: 'POST',
    body: JSON.stringify(data)
  }
})
