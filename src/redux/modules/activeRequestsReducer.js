import Immutable from 'immutable'

const initialState = Immutable.fromJS({
  data: {},
  total: 0
})

export default function activeRequestsReducer(state = initialState, action = null) {
  if (action.meta && action.meta.API_ACTION) {
    const API_ACTION = action.meta.API_ACTION

    const calculate = (state) => {
      const total = state.get('data').reduce((prev, item) => prev + item, 0)
      return state.set('total', total)
    }

    const { API_REQUEST_START, API_REQUEST_FINISH, endpoint, method } = API_ACTION

    const key = `${method}-${endpoint}`

    if (API_REQUEST_START) {
      const count = state.getIn(['data', key]) || 0
      return calculate(state.setIn(['data', key], count + 1))
    }

    if (API_REQUEST_FINISH) {
      const count = state.getIn(['data', key]) || 1
      return calculate(state.setIn(['data', key], count - 1))
    }
  }
  return state
}
