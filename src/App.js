/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React from 'react';
import {Component} from 'react';
import {Provider} from 'react-redux';
import configureStore from './configureStore';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import StockListScreen from './screens/StockListScreen';
import StockFormScreen from './screens/StockFormScreen';

const Stack = createStackNavigator();

const store = configureStore();

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <NavigationContainer>
          <Stack.Navigator initialRouteName="Home">
            <Stack.Screen name="Home" component={StockListScreen} />
            <Stack.Screen name="Add currency" component={StockFormScreen} />
          </Stack.Navigator>
        </NavigationContainer>
      </Provider>
    );
  }
}

export default App;
