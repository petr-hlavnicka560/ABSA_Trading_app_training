import React from 'react';
import {Component} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import routes from '../routes';
import StockListScreen from '../screens/StockListScreen';
import StockFormScreen from '../screens/StockFormScreen';
import {createStackNavigator} from '@react-navigation/stack';
import {connect} from 'react-redux';

const Stack = createStackNavigator();

class NavigationWrapper extends Component {
  render() {
    return (
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Home">
          <Stack.Screen
            name={routes.stockListScreen.name}
            component={StockListScreen}
            options={{title: 'Home'}}
          />
          <Stack.Screen
            name={routes.stockFormScreen.name}
            component={StockFormScreen}
            options={{title: this.props.stockFormScreenTitle}}
          />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
}

const mapStateToProps = state => ({
  stockFormScreenTitle: state.appData.stockFormScreenTitle,
});

export default connect(
  mapStateToProps,
  null
)(NavigationWrapper);
