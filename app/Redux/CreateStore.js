import { createStore, applyMiddleware } from 'redux'
import Config from '../Config/DebugConfig'
import createSagaMiddleware from 'redux-saga'
import ScreenTracking from './ScreenTrackingMiddleware'
// import logger from 'redux-logger'
import { composeWithDevTools } from 'redux-devtools-extension'
import { appNavigatorMiddleware } from '../Navigation/ReduxNavigation'
import { persistReducer, persistStore } from 'redux-persist'
import storage from 'redux-persist/lib/storage'

const persistConfig = {
  key: 'root',
  storage: storage,
  /**
   * Blacklist state that we do not need/want to persist
   */
  blacklist: [
    // 'auth',
  ],
}

// creates the store
export default (rootReducer, rootSaga) => {
  /* ------------- Redux Configuration ------------- */

  const middleware = []

  /* ------------- Navigation Middleware ------------ */
  middleware.push(appNavigatorMiddleware)

  /* ------------- Analytics Middleware ------------- */
  middleware.push(ScreenTracking)

  /* ------------- Saga Middleware ------------- */

  const sagaMiddleware = createSagaMiddleware()
  middleware.push(sagaMiddleware)

  /* ------------- Logger Middleware ------------- */
  // if (mainConfig.DEBUG && __DEV__) {
  // middleware.push(logger)
  // }

  /* ------------- Assemble Middleware ------------- */

  const persistedReducer = persistReducer(persistConfig, rootReducer)
  const store = __DEV__ 
    ? createStore(persistedReducer, composeWithDevTools(applyMiddleware(...middleware)))
    : createStore(persistedReducer, applyMiddleware(...middleware))
  // kick off root saga
  let sagasManager = sagaMiddleware.run(rootSaga)
  return {
    store,
    sagasManager,
    sagaMiddleware
  }
}
