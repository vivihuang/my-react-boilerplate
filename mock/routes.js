import requireDir from 'require-dir'
import { each, isFunction, isPlainObject } from 'lodash'

module.exports = (server) => {
  const resources = requireDir('./resources', { recurse: true })
  const buildRouters = (resource, resourceName) => {
    each(resource, (operation, operationName) => {
      if (/^_/.test(operationName)) {
        return
      }
      if (isFunction(operation)) {
        server[operationName](resourceName, operation)
      } else if (isPlainObject(operation)) {
        buildRouters(operation, resourceName + '/' + operationName.replace(/\{(.*?)\}/, ':$1'))
      }
    })
  }
  each(resources, (resource, resourceName) => {
    buildRouters(resource, resourceName)
  })
}
