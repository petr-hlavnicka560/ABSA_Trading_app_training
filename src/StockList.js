import React from 'react';
import {PropTypes} from 'prop-types';
import {View, Text, FlatList, ActivityIndicator} from 'react-native';
import {connect} from 'react-redux';
import {addCurrency} from './actions';

export class StockList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {rates: {}, isLoading: true};
  }

  componentDidMount() {
    // const {store} = this.context;
    // this.currencies = store.getState().currencies;
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
    // const {store} = this.context;
    // let currencies = store.getState().currencies;

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

// StockList.contextTypes = {store: PropTypes.object};

const mapStateToProps = state => ({
  currencies: [...state.appData.currencies],
});

//placeholder only not to pass null to connect
const mapDispatchToProps = dispatch => ({
  onSubmit(currency) {
    dispatch(
      addCurrency({
        symbol: currency.stockSymbol,
        amount: currency.count,
      })
    );
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(StockList);
