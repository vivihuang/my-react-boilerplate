export const setAsyncRouteLeaveHook = (router, route, hook) => {
  let withinHook = false
  let finalResult
  let finalResultSet = false

  router.setRouteLeaveHook(route, (nextLocation) => {
    withinHook = true
    if (!finalResultSet) {
      hook(nextLocation).then((result) => {
        finalResult = result
        finalResultSet = true
        if (!withinHook && nextLocation) {
          router.push(nextLocation)
        }
      })
    }
    const result = finalResultSet ? finalResult : false
    withinHook = false
    finalResult = undefined
    finalResultSet = false
    return result
  })
}
