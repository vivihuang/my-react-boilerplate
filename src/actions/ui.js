export const API_ERROR = 'API_ERROR'
export const RESET_ERROR = 'RESET_ERROR'

export const hasApiError = error => ({ type: API_ERROR, payload: error, error: true })

export const resetError = () => ({ type: RESET_ERROR })
