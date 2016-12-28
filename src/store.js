import { applyMiddleware, compose, createStore } from 'redux'
import { routerMiddleware } from 'react-router-redux'
import rootReducer from './redux'
import promiseMiddleware from '../base_modules/promise-middleware'
import { apiMiddleware } from '../base_modules/api-middleware'
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

  if (__DEBUG__) {
    if (module.hot) {
      module.hot.accept('./redux', () => {
        const nextReducers = require('./redux').default // eslint-disable-line global-require

        store.replaceReducer(nextReducers)
      })
    }
  }

  return store
}
