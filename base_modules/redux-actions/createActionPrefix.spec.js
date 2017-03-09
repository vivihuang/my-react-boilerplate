import { expect } from 'chai'

import createActionPrefix from './createActionPrefix'

describe('create action prefix', () => {
  it('should combine prefix with action name when prefix is a string', () => {
    const prefix = 'test-prefix'
    const actionName = 'test-action'
    const actual = createActionPrefix(prefix, actionName)
    const expected = `${prefix}-action--${actionName}`
    expect(actual).to.equal(expected)
  })

  it('should combine prefix with action name when prefix is current file name', () => {
    const prefix = __filename
    const actionName = 'test-action'
    const actual = createActionPrefix(prefix, actionName)
    const expected = `${prefix}-action--${actionName}`
    expect(actual).to.equal(expected)
  })

  it('should combine prefix with action name when prefix is empty', () => {
    const prefix = null
    const actionName = 'test-action'
    const actual = createActionPrefix(prefix, actionName)
    const expected = `action--${actionName}`
    expect(actual).to.not.equal(expected)
  })

  it('should work as curry method', () => {
    const prefix = __filename
    const actionTypeCreator = createActionPrefix(prefix)
    const actionName = 'test-action'
    const actual = actionTypeCreator(actionName)
    const expected = `${prefix}-action--${actionName}`
    expect(actual).to.equal(expected)
  })
})
