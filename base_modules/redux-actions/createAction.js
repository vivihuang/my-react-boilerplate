const getActionData = (func, args) => (typeof func === 'function' ? func(...args) : args)

const createAction = (actionType, fetchActionCreator, metaCreator) => (...args) => ({
  type: actionType,
  payload: getActionData(fetchActionCreator, args),
  meta: getActionData(metaCreator, args)
})

export default (actionName, actionCreator, metaCreator) => {
  const creator = (...args) => createAction(actionName, actionCreator, metaCreator)(...args)
  creator.toString = () => actionName
  return creator
}
