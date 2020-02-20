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
import {changeStockFormScreenTitle, loadRates} from '../actions';
import routes from '../routes';

class StockList extends React.Component {
  componentDidMount(): void {
    console.log('IN componentDidMount, currencies');
    console.log(this.props.currencies);
    this.props.dispatchLoadCurrencies(this.props.currencies);
  }

  render() {
    if (this.props.isLoading) {
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
                  this.props.onSubmitNavigateToChangeAmountHeld(
                    routes.stockFormScreen.titleChangeAmountHeld
                  );
                  navigation.navigate(routes.stockFormScreen.name, {
                    isAddCurrency: false,
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
  isLoading: state.appData.isLoading,
});

const mapDispatchToProps = {
  dispatchLoadCurrencies: loadRates,
  onSubmitNavigateToChangeAmountHeld: changeStockFormScreenTitle,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(StockList);
