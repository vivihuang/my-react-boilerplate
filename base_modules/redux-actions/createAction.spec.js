import chai from 'chai'
chai.use(require('chai-shallow-deep-equal'))

import creator from './createAction'

const expect = chai.expect

describe('createAction', () => {
  it('should convert payload to array when payload is a string', () => {
    const actionName = 'test'
    const actionPayload = 'This is a payload string.'
    const expected = {
      type: actionName,
      payload: [actionPayload],
      meta: [actionPayload]
    }
    const actual = creator(actionName)(actionPayload)
    expect(actual).to.shallowDeepEqual(expected)
  })

  it('should convert payload to array when payload is a object', () => {
    const actionName = 'test'
    const actionPayload = { content: 'This is a payload object.' }
    const expected = {
      type: actionName,
      payload: [actionPayload],
      meta: [actionPayload]
    }
    const actual = creator(actionName)(actionPayload)
    expect(actual).to.shallowDeepEqual(expected)
  })

  it('should convert function output as payload and parameter as meta when payload is a function', () => {
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
    expect(actual).to.shallowDeepEqual(expected)
  })

  it('should convert function output as payload and meta when payload and meta are both functions', () => {
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
    expect(actual).to.shallowDeepEqual(expected)
  })
})
