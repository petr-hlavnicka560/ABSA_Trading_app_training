import React from 'react';
import {connect} from 'react-redux';
import {View, TextInput, Button, StyleSheet} from 'react-native';
import {addCurrency, changeAmountHeld, toggleIsLoading} from '../actions';

export class StockFormScreen extends React.Component {
  state = {
    symbol: '',
    amount: '',
  };

  render() {
    const {navigation, route} = this.props;
    const {
      symbolIsEditable,
      symbolOfCurrencyUpdated,
      amountOfCurrencyUpdated,
    } = route.params;
    return (
      <View>
        <TextInput
          style={styles.textInput}
          placeholder="Stock symbol!"
          editable={symbolIsEditable}
          onChangeText={text => this.setState({symbol: text.toUpperCase()})}
          value={symbolIsEditable ? this.state.symbol : symbolOfCurrencyUpdated}
        />
        <TextInput
          style={styles.textInput}
          placeholder={symbolIsEditable ? 'Count!' : amountOfCurrencyUpdated}
          keyboardType="number-pad"
          onChangeText={text => this.setState({amount: text})}
          value={this.state.amount}
        />
        <Button
          title="Submit"
          onPress={() => {
            symbolIsEditable
              ? this.props.onSubmitAddCurrency(this.state)
              : this.props.onSubmitAmountHeldUpdate(
                  symbolOfCurrencyUpdated,
                  this.state.amount
                );
            navigation.navigate('Home');
          }}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  textInput: {height: 80, padding: 20},
});

const mapDispatchToProps = {
  onSubmitAddCurrency: onSubmitAddCurrency,
  onSubmitAmountHeldUpdate: onSubmitAmountHeldUpdate,
};

function onSubmitAddCurrency(currency) {
  return dispatch => {
    dispatch(addCurrency(currency));
    dispatch(toggleIsLoading(true));
  };
}

function onSubmitAmountHeldUpdate(symbol, amount) {
  return dispatch => {
    dispatch(
      changeAmountHeld({
        symbol: symbol,
        amount: amount,
      })
    );
  };
}

export default connect(
  null,
  mapDispatchToProps
)(StockFormScreen);
