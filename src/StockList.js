import React from 'react';
import {View, Text, FlatList, ActivityIndicator} from 'react-native';

const currencies = [
  {symbol: 'BTC', amount: 10},
  {symbol: 'ETH', amount: 5},
];

export class StockList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {rates: {}, isLoading: true};
  }

  componentDidMount() {
    const promises = currencies.map(currency => {
      return fetch(
        `https://rest.coinapi.io/v1/exchangerate/${currency.symbol}/USD`,
        {
          headers: {
            'X-CoinAPI-Key': 'DE9AE379-7C5A-4738-99EF-535EC6A6AF09',
          },
        },
      ).then(response => response.json());
    });

    console.log('===Promises:', promises);

    // const btcRate = fetch('https://rest.coinapi.io/v1/exchangerate/BTC/USD', {
    //   headers: {
    //     'X-CoinAPI-Key': 'EFD6B937-F769-4397-968E-EF29497303C5',
    //   },
    // })
    //   .then(response => response.json())
    //   .then(json => console.log(`===== btcRate reply: ${json}`));

    // const ethRate = fetch('https://rest.coinapi.io/v1/exchangerate/ETH/USD', {
    //   headers: {
    //     'X-CoinAPI-Key': 'EFD6B937-F769-4397-968E-EF29497303C5',
    //   },
    // }).then(response => response.json());

    Promise.all(promises)
      .then(responsesJson => {
        console.log('===== responsesJson: ', responsesJson);
        const rates = currencies.reduce((acc, val, idx) => {
          acc[val.symbol] = responsesJson[idx].rate;
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
    return (
      <View>
        <Text>StockList</Text>
        <FlatList
          data={currencies}
          renderItem={({item}) => (
            <Text>{`${item.symbol}: ${item.amount *
              this.state.rates[item.symbol]}`}</Text>
          )}
          keyExtractor={item => item.symbol}
        />
      </View>
    );
  }
}
