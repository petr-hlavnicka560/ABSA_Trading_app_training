/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React from 'react';
import {SafeAreaView, StatusBar, StyleSheet, Text, View} from 'react-native';
import {StockList} from './StockList';

const Home2 = () => {
  return (
    <>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView>
        <View style={styles.header}>
          <Text style={styles.headerText}>Trading App 2</Text>
        </View>
        {/* <StockForm onSubmit={values => console.log(values)} /> */}
        <StockList />
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

export default Home2;
