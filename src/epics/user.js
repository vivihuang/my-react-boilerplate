import { Observable } from 'rxjs/Observable'

import { LOGIN, loginSuccess } from '../actions/user'
import { login } from '../services/user'
import { resetError, hasApiError } from '../actions/ui'

export const loginEpic = action$ =>
  action$.ofType(LOGIN)
    .mergeMap(action => login(action.payload)
      .map(res => res.response)
      .mergeMap(data => Observable.merge(Observable.of(resetError()), Observable.of(loginSuccess(data))))
      .catch(error => Observable.of(hasApiError(error.status))))
