import { applyMiddleware, compose, createStore } from 'redux'
import { routerMiddleware } from 'react-router-redux'
import { promiseMiddleware } from 'redux-actions-helper'

import rootReducer from './reducers'
import { apiMiddleware } from './middlewares/api-middleware'
import authMiddleware from './middlewares/auth-middleware'
import errorMiddleware from './middlewares/error-middleware'
import DevTools from './components/DevTools'

export default function configureStore(initialState, history) {
  const middlewares = [
    applyMiddleware(authMiddleware),
    applyMiddleware(apiMiddleware),
    applyMiddleware(promiseMiddleware),
    applyMiddleware(errorMiddleware),
    applyMiddleware(routerMiddleware(history))
  ]

  if (__DEBUG__) {
    middlewares.push(DevTools.instrument())
  }

  const store = compose(
    ...middlewares
  )(createStore)(
    rootReducer, initialState
  )

  if (__DEBUG__ && module.hot) {
    module.hot.accept('./reducers', () => {
      store.replaceReducer(require('./reducers').default) // eslint-disable-line global-require
    })
  }

  return store
}
