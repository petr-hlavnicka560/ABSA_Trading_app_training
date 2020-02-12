/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React from 'react';
import {Component} from 'react';
import {PropTypes} from 'prop-types';
import {Provider} from 'react-redux';
import configureStore from './configureStore';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import Home from './Home';
import StockForm from './StockForm';

const Stack = createStackNavigator();

const store = configureStore();

console.log('=====store state: ' + store.getState());
console.log(store.getState().appData);
console.log('=====store.currencies: ' + store.getState().currencies);

class App extends Component {
  // getChildContext() {
  //   return {
  //     store: store,
  //   };
  // }
  // componentDidMount() {
  //   this.unsubscribe = store.subscribe(() => this.forceUpdate());
  // }
  // componentWillUnmount() {
  //   this.unsubscribe();
  // }

  render() {
    return (
      <Provider store={store}>
        <NavigationContainer>
          <Stack.Navigator initialRouteName="Home">
            <Stack.Screen name="Home" component={Home} />
            <Stack.Screen name="Add currency" component={StockForm} />
          </Stack.Navigator>
        </NavigationContainer>
      </Provider>
    );
  }
}

// App.childContextTypes = {
//   store: PropTypes.object.isRequired,
// };

export default App;
