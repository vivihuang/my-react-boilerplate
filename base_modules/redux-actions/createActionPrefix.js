import { curry, uniqueId } from 'lodash'

const createActionPrefix = curry((prefix, actionName) => `${prefix || uniqueId()}-action--${actionName}`)

export default createActionPrefix
