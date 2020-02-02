import { createStore, applyMiddleware } from 'redux'
import Config from '../Config/DebugConfig'
import createSagaMiddleware from 'redux-saga'
import ScreenTracking from './ScreenTrackingMiddleware'
// import logger from 'redux-logger'
import { composeWithDevTools } from 'redux-devtools-extension'
import { appNavigatorMiddleware } from '../Navigation/ReduxNavigation'

// creates the store
export default (rootReducer, rootSaga) => {
  /* ------------- Redux Configuration ------------- */

  const middleware = []

  /* ------------- Navigation Middleware ------------ */
  middleware.push(appNavigatorMiddleware)

  /* ------------- Analytics Middleware ------------- */
  middleware.push(ScreenTracking)

  /* ------------- Saga Middleware ------------- */

  const sagaMonitor = Config.pdebug
    ? null : null
  const sagaMiddleware = createSagaMiddleware({ sagaMonitor })
  middleware.push(sagaMiddleware)

  /* ------------- Logger Middleware ------------- */
  // if (mainConfig.DEBUG && __DEV__) {
  // middleware.push(logger)
  // }

  /* ------------- Assemble Middleware ------------- */

  const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(...middleware)))

  // kick off root saga
  let sagasManager = sagaMiddleware.run(rootSaga)

  return {
    store,
    sagasManager,
    sagaMiddleware
  }
}
