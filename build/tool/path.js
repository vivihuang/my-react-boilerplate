import path from 'path'
import { concat } from 'lodash'

const getRootPath = (...args) => {
  const basePath = [__dirname, '../../']
  return path.join.apply(null, concat(basePath, args)
  )
}

export default getRootPath
