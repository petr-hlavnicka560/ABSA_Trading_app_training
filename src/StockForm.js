import React from 'react';
import {connect} from 'react-redux';
import {PropTypes} from 'prop-types';
import {View, TextInput, Button, StyleSheet} from 'react-native';
import {addCurrency} from './actions';

export class StockForm extends React.Component {
  state = {
    stockSymbol: '',
    count: '',
  };

  render() {
    const {navigation} = this.props;
    return (
      <View>
        <TextInput
          style={styles.textInput}
          placeholder="Stock symbol!"
          onChangeText={text =>
            this.setState({stockSymbol: text.toUpperCase()})
          }
          value={this.state.stockSymbol}
        />
        <TextInput
          style={styles.textInput}
          placeholder="Count!"
          keyboardType="number-pad"
          onChangeText={text => this.setState({count: text})}
          value={this.state.count}
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

// StockForm.contextTypes = {store: PropTypes.object};

const styles = StyleSheet.create({
  textInput: {height: 80, padding: 20},
});

const mapDispatchToProps = {
  onSubmit: onSubmit,
};

function onSubmit(currency) {
  return dispatch => {
    dispatch(
      addCurrency({
        symbol: currency.stockSymbol,
        amount: currency.count,
      })
    );
  };
}

export default connect(
  null,
  mapDispatchToProps
)(StockForm);
