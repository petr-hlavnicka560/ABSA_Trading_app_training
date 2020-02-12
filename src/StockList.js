import React from 'react';
import {View, Text, FlatList, ActivityIndicator} from 'react-native';
import {connect} from 'react-redux';

export class StockList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {rates: {}, isLoading: true};
  }

  componentDidMount() {
    const promises = this.props.currencies.map(currency => {
      return fetch(
        `https://rest.coinapi.io/v1/exchangerate/${currency.symbol}/USD`,
        {
          headers: {
            'X-CoinAPI-Key': 'DE9AE379-7C5A-4738-99EF-535EC6A6AF09',
          },
        }
      ).then(response => response.json());
    });

    console.log('===Promises:', promises);

    Promise.all(promises)
      .then(responsesJson => {
        console.log('===== responsesJson: ', responsesJson);
        const rates = this.props.currencies.reduce((acc, val, idx) => {
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
          data={this.props.currencies}
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

const mapStateToProps = state => ({
  currencies: [...state.appData.currencies],
});

export default connect(
  mapStateToProps,
  null
)(StockList);
