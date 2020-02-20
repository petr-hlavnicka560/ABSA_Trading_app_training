/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {Provider} from 'react-redux';
import configureStore from './configureStore';
import NavigationWrapper from './components/NavigationWrapper';

const store = configureStore();

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <NavigationWrapper />
      </Provider>
    );
  }
}

export default App;
