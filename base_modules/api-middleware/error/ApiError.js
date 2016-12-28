export default class ApiError extends Error {
  constructor(status, statusText, response) {
    super()
    this.name = 'ApiError'
    this.status = status
    this.statusText = statusText
    this.response = response
    this.message = `${status} - ${statusText}`
  }
}
