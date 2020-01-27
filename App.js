
import React, { Component } from 'react'
import { StatusBar } from 'react-native'
import { Provider } from 'react-redux'
import ReduxNavigation from './app/Navigation/ReduxNavigation'
import createStore from './app/Redux'

// create our store
const store = createStore()

/**
 * Provides an entry point into our application.  Both index.ios.js and index.android.js
 * call this component first.
 *
 * We create our Redux store here, put it into a provider and then bring in our
 * RootContainer.
 *
 * We separate like this to play nice with React Native's hot reloading.
 */
class App extends Component {
  render () {
    return (
      <Provider store={store}>
        <StatusBar backgroundColor='white' barStyle='dark-content' />
        <ReduxNavigation />
      </Provider>
    )
  }
}

// allow reactotron overlay for fast design in dev mode
export default App
