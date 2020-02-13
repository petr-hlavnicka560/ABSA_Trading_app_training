import React from 'react';
import {connect} from 'react-redux';
import {View, TextInput, Button, StyleSheet} from 'react-native';
import {addCurrency} from './actions';

export class StockForm extends React.Component {
  state = {
    symbol: '',
    amount: '',
  };

  render() {
    const {navigation} = this.props;
    return (
      <View>
        <TextInput
          style={styles.textInput}
          placeholder="Stock symbol!"
          onChangeText={text => this.setState({symbol: text.toUpperCase()})}
          value={this.state.symbol}
        />
        <TextInput
          style={styles.textInput}
          placeholder="Count!"
          keyboardType="number-pad"
          onChangeText={text => this.setState({amount: text})}
          value={this.state.amount}
        />
        <Button
          title="Submit"
          onPress={() => {
            this.props.onSubmit(this.state);
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
  onSubmit: onSubmit,
};

function onSubmit(currency) {
  return dispatch => {
    dispatch(addCurrency(currency));
  };
}

export default connect(
  null,
  mapDispatchToProps
)(StockForm);
