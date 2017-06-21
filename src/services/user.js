import { request } from '../utils/request'

export const login = data =>
  request('login', {
    method: 'POST',
    body: JSON.stringify(data)
  })
