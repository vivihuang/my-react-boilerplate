export const API_ERROR = 'API_ERROR'

export const hasApiError = error => ({ type: API_ERROR, payload: error, error: true })
