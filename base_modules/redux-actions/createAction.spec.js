import test from 'ava'

import creator from './createAction'

test('should convert payload to array when payload is a string', t => {
  const actionName = 'test'
  const actionPayload = 'This is a payload string.'
  const expected = {
    type: actionName,
    payload: [actionPayload],
    meta: [actionPayload]
  }
  const actual = creator(actionName)(actionPayload)
  t.deepEqual(actual, expected)
})

test('should convert payload to array when payload is a string', t => {
  const actionName = 'test'
  const actionPayload = 'This is a payload string.'
  const expected = {
    type: actionName,
    payload: [actionPayload],
    meta: [actionPayload]
  }
  const actual = creator(actionName)(actionPayload)
  t.deepEqual(actual, expected)
})

test('should convert payload to array when payload is a string', t => {
  const actionName = 'test'
  const actionPayload = 'This is a payload string.'
  const expected = {
    type: actionName,
    payload: [actionPayload],
    meta: [actionPayload]
  }
  const actual = creator(actionName)(actionPayload)
  t.deepEqual(actual, expected)
})

test('should convert payload to array when payload is a object', t => {
  const actionName = 'test'
  const actionPayload = { content: 'This is a payload object.' }
  const expected = {
    type: actionName,
    payload: [actionPayload],
    meta: [actionPayload]
  }
  const actual = creator(actionName)(actionPayload)
  t.deepEqual(actual, expected)
})

test('should convert function output as payload and parameter as meta when payload is a function', t => {
  const actionName = 'test'
  const actionPayload = (payloadContent) => `This is payload ${payloadContent}.`
  const payloadContent = 'test content'
  const testAction = creator(actionName, actionPayload)
  const actual = testAction(payloadContent)
  const expected = {
    type: actionName,
    payload: actionPayload(payloadContent),
    meta: [payloadContent]
  }
  t.deepEqual(actual, expected)
})

test('should convert function output as payload and meta when payload and meta are both functions', t => {
  const actionName = 'test'
  const actionPayload = (payloadContent) => `This is payload ${payloadContent}.`
  const actionMeta = (metaContent) => `This is meta ${metaContent}.`
  const payloadContent = 'test content'
  const testAction = creator(actionName, actionPayload, actionMeta)
  const actual = testAction(payloadContent)
  const expected = {
    type: actionName,
    payload: actionPayload(payloadContent),
    meta: actionMeta(payloadContent)
  }
  t.deepEqual(actual, expected)
})
