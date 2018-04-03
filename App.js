import React, { Component } from 'react';
import { StyleSheet, Text, View, TextInput, Button } from 'react-native';

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
          <View style={styles.inputContainer}>
              <TextInput value={this.state.placeName} onChangeText={this.placeNameChangedHandler}
                         style={styles.placeInput} placeholder='An awesome place'/>
              <Button title='Add' style={styles.placeButton}/>
          </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 26,
        justifyContent: 'flex-start',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    },
    inputContainer: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    placeInput: {
        width: '70%'
    },
    placeButton: {
        width: '30%'
    }
});
