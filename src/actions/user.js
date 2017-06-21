export const LOGIN = 'LOGIN'
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS'

export const login = data => ({ type: LOGIN, payload: data })

export const loginSuccess = data => ({ type: LOGIN_SUCCESS, payload: data })
