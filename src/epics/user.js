import * as userActions from '../actions/user'
import * as userServices from '../services/user'

export const loginEpic = action$ =>
  action$.ofType(userActions.LOGIN)
    .mergeMap(action => userServices.login(action.payload))
