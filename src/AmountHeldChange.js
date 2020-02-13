import React from 'react';
import {connect} from 'react-redux';
import {View, TextInput, Button, StyleSheet, Text} from 'react-native';
import {changeAmountHeldFinish} from './actions';

class AmountHeldChange extends React.Component {
  state = {
    amount: '',
  };
  symbol = this.props.stockSymbolInChange;

  render() {
    const {navigation} = this.props;
    console.log(this.props);
    return (
      <View>
        <Text>{this.symbol}</Text>
        <TextInput
          style={styles.textInput}
          placeholder="New count!"
          keyboardType="number-pad"
          onChangeText={text => this.setState({amount: text})}
          value={this.state.amount}
        />
        <Button
          title="Submit"
          onPress={() => {
            this.props.onSubmit(this.symbol, this.state.amount);
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

const mapStateToProps = state => {
  return {
    stockSymbolInChange: state.appData.stockSymbolInChange,
  };
};

const mapDispatchToProps = {
  onSubmit: onSubmit,
};

function onSubmit(symbol, amount) {
  return dispatch => {
    dispatch(
      changeAmountHeldFinish({
        symbol: symbol,
        amount: amount,
      })
    );
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AmountHeldChange);
