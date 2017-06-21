import { combineEpics } from 'redux-observable'

import { loginEpic } from './user'

export default combineEpics(loginEpic)
