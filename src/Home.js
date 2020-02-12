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
import StockList from './StockList';

const Home = ({navigation}) => {
  return (
    <>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView>
        <View style={styles.header}>
          <Text style={styles.headerText}>Trading App</Text>
        </View>
        {/* <StockForm onSubmit={values => console.log(values)} /> */}
        <StockList />
        <Button
          title="Add currency"
          onPress={() => navigation.navigate('Add currency')}
        />
      </SafeAreaView>
    </>
  );
};

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

export default Home;
