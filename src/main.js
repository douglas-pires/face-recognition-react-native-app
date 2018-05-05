import React, { Component } from 'react';
import Main from './scenes/Main'
import { Provider } from 'react-redux'

import configureStore from './state/store'

const store = configureStore()

export default class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Main />
      </Provider>
    )
  }
}
