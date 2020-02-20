import React from 'react';
import {connect} from 'react-redux';
import {View, TextInput, Button, StyleSheet} from 'react-native';
import {addCurrencyAndReloadRates, changeAmountHeld} from '../actions';
import routes from '../routes';

class StockFormScreen extends React.Component {
  state = {
    symbol: '',
    amount: '',
  };

  render() {
    const {navigation, route} = this.props;
    const {
      isAddCurrency,
      symbolOfCurrencyUpdated,
      amountOfCurrencyUpdated,
    } = route.params;
    return (
      <View>
        <TextInput
          style={styles.textInput}
          placeholder="Stock symbol!"
          editable={isAddCurrency}
          onChangeText={text => this.setState({symbol: text.toUpperCase()})}
          value={isAddCurrency ? this.state.symbol : symbolOfCurrencyUpdated}
        />
        <TextInput
          style={styles.textInput}
          placeholder={isAddCurrency ? 'Count!' : amountOfCurrencyUpdated}
          keyboardType="number-pad"
          onChangeText={text => this.setState({amount: text})}
          value={this.state.amount}
        />
        <Button
          title="Submit"
          onPress={() => {
            isAddCurrency
              ? this.props.onSubmitAddCurrency(this.state)
              : this.props.onSubmitAmountHeldUpdate({
                  symbol: symbolOfCurrencyUpdated,
                  amount: this.state.amount,
                });
            navigation.navigate(routes.stockListScreen.name);
          }}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  textInput: {height: 80, padding: 20},
});

const mapStateToProps = state => ({
  currencies: state.appData.currencies,
});

const mapDispatchToProps = {
  onSubmitAddCurrency: addCurrencyAndReloadRates,
  onSubmitAmountHeldUpdate: changeAmountHeld,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(StockFormScreen);
