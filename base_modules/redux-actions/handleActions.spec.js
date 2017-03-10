import test from 'ava'

import { createActionPrefix, createAction } from '../redux-actions'
import handleActions from './handleActions'

const initialState = {
  counter: 0,
  success: null
}

const actionTypes = {
  INCREMENT: 'INCREMENT',
  DECREMENT: 'DECREMENT'
}

const actionTypeCreator = createActionPrefix(__filename)

const increment = createAction(actionTypeCreator(actionTypes.INCREMENT))
const incrementSuccess = (value) => {
  const action = increment(value)
  return Object.assign(action, { type: `${action.type}__SUCCESS`, payload: action.payload[0] })
}
const incrementFail = (value) => {
  const action = increment(value)
  return Object.assign(action, { type: `${action.type}__FAIL` })
}
const decrement = createAction(actionTypeCreator(actionTypes.DECREMENT))
const decrementSuccess = (value) => {
  const action = decrement(value)
  return Object.assign(action, { type: `${action.type}__SUCCESS`, payload: action.payload[0] })
}
const decrementFail = (value) => {
  const action = decrement(value)
  return Object.assign(action, { type: `${action.type}__FAIL` })
}

const reducer = handleActions((on) => {
  on(increment, (state, action) => ({
    counter: state.counter + action.payload[0]
  }))
  on(decrement, (state, action) => ({
    counter: state.counter - action.payload[0]
  }))
  on.success(increment, (state, action) => ({
    counter: state.counter + action.payload,
    success: true
  }))
  on.success(decrement, (state, action) => ({
    counter: state.counter - action.payload,
    success: true
  }))
  on.fail(increment, (state, action) => ({
    counter: state.counter,
    success: false
  }))
  on.fail(decrement, (state, action) => ({
    counter: state.counter,
    success: false
  }))
}, initialState)

test('should increment after calling increment action', t => {
  const actual = reducer(undefined, increment(3))
  const expected = { counter: initialState.counter + 3 }
  t.deepEqual(actual, expected)
})

test('should decrement after calling decrement action', t => {
  const actual = reducer(undefined, decrement(3))
  const expected = { counter: initialState.counter - 3 }
  t.deepEqual(actual, expected)
})

test('should increment after calling increment action successful', t => {
  const actual = reducer(undefined, incrementSuccess(3))
  const expected = { counter: initialState.counter + 3, success: true }
  t.deepEqual(actual, expected)
})

test('should decrement after calling decrement action successful', t => {
  const actual = reducer(undefined, decrementSuccess(3))
  const expected = { counter: initialState.counter - 3, success: true }
  t.deepEqual(actual, expected)
})

test('should increment after calling increment action failed', t => {
  const actual = reducer(undefined, incrementFail(3))
  const expected = { counter: initialState.counter, success: false }
  t.deepEqual(actual, expected)
})

test('should decrement after calling decrement action failed', t => {
  const actual = reducer(undefined, decrementFail(3))
  const expected = { counter: initialState.counter, success: false }
  t.deepEqual(actual, expected)
})
