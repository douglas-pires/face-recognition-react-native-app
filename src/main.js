import React, { Component } from 'react';
import Router from './scenes/router'
import { Provider } from 'react-redux'

import configureStore from './state/store'

const store = configureStore()

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router />
      </Provider>
    )
  }
}

export default App