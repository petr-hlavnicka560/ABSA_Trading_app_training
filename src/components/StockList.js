import React from 'react';
import {
  View,
  Text,
  FlatList,
  ActivityIndicator,
  Button,
  StyleSheet,
} from 'react-native';
import {connect} from 'react-redux';
import {loadCurrencies} from '../actions';

class StockList extends React.Component {
  render() {
    if (this.props.isLoading) {
      loadData(this.props.currencies, this.props.dispatchLoadCurrencies);
      return (
        <View style={{flex: 1, padding: 20}}>
          <ActivityIndicator />
        </View>
      );
    }
    const {navigation} = this.props;
    console.log(navigation);
    return (
      <View>
        <Text>StockList</Text>
        <FlatList
          data={this.props.currencies}
          renderItem={({item}) => (
            <View style={styles.tableLine}>
              <Text>
                {`Symbol: ${item.symbol} Amount held: ${
                  item.amount
                } Value: ${item.amount * item.rate}`}
              </Text>
              <Button
                style={styles.button}
                title="Change"
                onPress={() => {
                  navigation.navigate('Add currency', {
                    symbolIsEditable: false,
                    symbolOfCurrencyUpdated: item.symbol,
                    amountOfCurrencyUpdated: item.amount.toString(),
                  });
                }}
              />
            </View>
          )}
          keyExtractor={item => item.symbol}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  button: {width: '50%'}, //does not work
  tableLine: {flexDirection: 'row', alignItems: 'center'},
});

async function loadData(currencies, dispatchLoadCurrencies) {
  console.log('======== INSIDE componentDidMount()');
  const promises = currencies.map(async currency => {
    const response = await fetch(
      `https://sandbox.iexapis.com/stable/stock/${
        currency.symbol
      }/quote?token=Tpk_d6fe47c7f6f54c389c7ac9c0c60f5e2c`
    );
    return response.json();
  });

  console.log('===Promises:', promises);

  let responsesJson;
  try {
    responsesJson = await Promise.all(promises);
  } catch (e) {
    alert(e);
  }

  console.log('===== responsesJson: ', responsesJson);
  const updatedCurrencies = currencies.map((val, idx) => {
    return {...val, rate: responsesJson[idx].latestPrice};
  });
  const updatedState = {currencies: updatedCurrencies, isLoading: false};
  console.log('===== updatedCurrencies: ', updatedCurrencies);
  dispatchLoadCurrencies(updatedState);
}

const mapStateToProps = state => ({
  currencies: state.appData.currencies,
  isLoading: state.appData.isLoading,
});

const mapDispatchToProps = {
  dispatchLoadCurrencies: dispatchLoadCurrencies,
};

function dispatchLoadCurrencies(state) {
  return dispatch => {
    dispatch(loadCurrencies(state));
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(StockList);
