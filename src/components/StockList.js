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

class StockList extends React.Component {
  state = {rates: {}, isLoading: true};

  componentDidMount() {
    console.log('======== INSIDE componentDidMount()');
    const promises = this.props.currencies.map(currency => {
      return fetch(
        `https://sandbox.iexapis.com/stable/stock/${
          currency.symbol
        }/quote?token=Tpk_d6fe47c7f6f54c389c7ac9c0c60f5e2c`
      ).then(response => response.json());
    });

    console.log('===Promises:', promises);

    Promise.all(promises)
      .then(responsesJson => {
        console.log('===== responsesJson: ', responsesJson);
        const rates = this.props.currencies.reduce((acc, val, idx) => {
          acc[val.symbol] = responsesJson[idx].latestPrice;
          return acc;
        }, {});
        console.log('===== rates: ', rates);
        this.setState({
          rates,
          isLoading: false,
        });
      })
      .catch(error => console.log(error));
  }

  render() {
    if (this.state.isLoading) {
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
                } Value: ${item.amount * this.state.rates[item.symbol]}`}
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

const mapStateToProps = state => ({
  currencies: state.appData.currencies,
});

export default connect(
  mapStateToProps,
  null
)(StockList);
