/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React from 'react';
import {
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  View,
  Button,
} from 'react-native';
import StockList from '../components/StockList';
import routes from '../routes';
import {changeStockFormScreenTitle} from '../actions';
import {connect} from 'react-redux';

class StockListScreen extends React.Component {
  render() {
    const {navigation} = this.props;
    return (
      <>
        <StatusBar barStyle="dark-content" />
        <SafeAreaView>
          <View style={styles.header}>
            <Text style={styles.headerText}>Trading App</Text>
          </View>
          <StockList navigation={navigation} />
          <Button
            title="Add currency"
            onPress={() => {
              this.props.onSubmitNavigateToAddCurrency(
                routes.stockFormScreen.titleAddCurrency
              );
              navigation.navigate(routes.stockFormScreen.name, {
                isAddCurrency: true,
              });
            }}
          />
        </SafeAreaView>
      </>
    );
  }
}

const styles = StyleSheet.create({
  header: {
    height: 80,
  },
  headerText: {
    textAlign: 'center',
    fontSize: 36,
    fontWeight: 'bold',
  },
});

const mapDispatchToProps = {
  onSubmitNavigateToAddCurrency: changeStockFormScreenTitle,
};

export default connect(
  null,
  mapDispatchToProps
)(StockListScreen);
