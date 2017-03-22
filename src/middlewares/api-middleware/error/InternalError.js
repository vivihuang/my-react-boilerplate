export default class InternalError extends Error {
  constructor(message) {
    super()
    this.name = 'InternalError'
    this.message = message
  }
}
