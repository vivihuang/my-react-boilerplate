import { applyMiddleware, compose, createStore } from 'redux'
import { routerMiddleware } from 'react-router-redux'
import { createEpicMiddleware } from 'redux-observable'

import rootEpic from './epics'
import rootReducer from './reducers'
import DevTools from './components/DevTools'

const epicMiddleware = createEpicMiddleware(rootEpic)

export default function configureStore(initialState, history) {
  const middlewares = [
    applyMiddleware(epicMiddleware),
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
