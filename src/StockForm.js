import React from 'react';
import {View, TextInput, Button, StyleSheet} from 'react-native';

export class StockForm extends React.Component {
  state = {
    stockSymbol: '',
    count: '',
  };

  render() {
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
          onPress={() => this.props.onSubmit(this.state)}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  textInput: {height: 80, padding: 20},
});
