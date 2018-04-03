import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View, TextInput } from 'react-native';

export default class App extends Component {
  state = {
    placeName: ''
  }

  placeNameChangedHandler = value => {
    this.setState({placeName: value})
  }

  render() {
    return (
      <View style={styles.container}>
        <TextInput value={this.state.placeName} onChangeText={this.placeNameChangedHandler}
                   style={{width: 300, borderColor: 'black', borderWidth: 1}}/>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  }
});
