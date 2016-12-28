import Joi from 'joi-browser'
import { curry, each, reduce } from 'lodash'
import Immutable from 'immutable'

export default curry((Schema, values) => {
  const isImmutable = Immutable.Iterable.isIterable(values)
  let validateData = values

  const errors = {}

  if (isImmutable) {
    validateData = values.toJS()
  }

  const validateResult = Joi.validate(validateData, Schema, {
    abortEarly: false,
    language: {
      key: '',
      any: {
        unknown: '{{key}}为非法输入',
        empty: '请输入{{key}}',
        required: '请输入{{key}}'
      },
      string: {
        email: '{{key}}格式不正确',
        max: '{{key}}不能超过{{limit}}个字符',
        regex: { base: '{{key}}格式不正确' }
      },
      array: {
        min: '尚未选择{{key}}'
      },
      date: {
        base: '尚未选择{{key}}'
      },
      number: {
        base: '尚未选择{{key}}'
      }
    }
  })

  const validateError = validateResult.error

  if (validateError) {
    const errorDetails = validateError.details

    each(errorDetails, (detail) => {
      if (!errors[detail.path]) {
        errors[detail.path] = detail.message
      }
    })
  }
  return errors
})

export const getSingleError = (fields, errorString) =>
  reduce(fields, (prev, item) => {
    if (prev) {
      return prev
    }
    return item.touched && item.error ? item.error : null
  }, null) || errorString
