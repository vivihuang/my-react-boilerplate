import { createAction } from 'redux-actions-helper'

import * as userServices from '../../services/user'

export const login = createAction('LOGIN', data => userServices.login(data))
