import { alert } from '../redux/actions/ui'
import ErrorCode from '../constants/ErrorCode'

const errorMiddleware = ({ dispatch }) => next => (action) => {
  const payload = action.payload
  const meta = action.meta

  if (action.meta && meta.API_ACTION && action.error) {
    const status = payload.status
    const error = payload

    if (status === 401 || status === 403) {
      if (error.errorCode === 'USER_UNABLE') {
        dispatch(alert(ErrorCode.USER_UNABLE))
      } else if (status === 403) {
        dispatch(alert(ErrorCode.NO_PERMISSION))
      }
    } else if (status === 404) {
      dispatch(alert('服务器开小差了,请稍后重试!'))
    } else if (status) {
      if (ErrorCode[error.errorCode] && !meta.API_ACTION.ignoreError) {
        dispatch(alert(ErrorCode[error.errorCode]))
      } else if (!meta.API_ACTION.ignoreError) {
        dispatch(alert('服务器开小差了,请稍后重试!'))
      }
    }
  }
  return next(action)
}

export default errorMiddleware
