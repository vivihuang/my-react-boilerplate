import test from 'ava'

import createActionPrefix from './createActionPrefix'

test('should combine prefix with action name when prefix is a string', t => {
  const prefix = 'test-prefix'
  const actionName = 'test-action'
  const actual = createActionPrefix(prefix, actionName)
  const expected = `${prefix}-action--${actionName}`
  t.is(actual, expected)
})

test('should combine prefix with action name when prefix is current file name', t => {
  const prefix = __filename
  const actionName = 'test-action'
  const actual = createActionPrefix(prefix, actionName)
  const expected = `${prefix}-action--${actionName}`
  t.is(actual, expected)
})

test('should combine prefix with action name when prefix is empty', t => {
  const prefix = null
  const actionName = 'test-action'
  const actual = createActionPrefix(prefix, actionName)
  const expected = `action--${actionName}`
  t.not(actual, expected)
})

test('should work as curry method', t => {
  const prefix = __filename
  const actionTypeCreator = createActionPrefix(prefix)
  const actionName = 'test-action'
  const actual = actionTypeCreator(actionName)
  const expected = `${prefix}-action--${actionName}`
  t.is(actual, expected)
})
