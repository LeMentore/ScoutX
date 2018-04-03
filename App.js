import React, { Component } from 'react';
import { StyleSheet, Text, View, TextInput, Button } from 'react-native';

export default class App extends Component {
    state = {
        placeName: '',
        places: []
    }

    placeNameChangedHandler = value => {
        this.setState({placeName: value})
    }

    placeSubmitHandler = () => {
        if(this.state.placeName.trim() === '') return
        this.setState(prevState => {
            return {
                places: [prevState.placeName, ...prevState.places]
            }
        })
    }

    render() {
        const placesOutput = this.state.places.map((place, index) => (<Text key={index}>{place}</Text>) )
        return (
            <View style={styles.container}>
                <View style={styles.inputContainer}>
                    <TextInput value={this.state.placeName} onChangeText={this.placeNameChangedHandler}
                               style={styles.placeInput} placeholder='An awesome place'/>
                    <Button title='Add' style={styles.placeButton} onPress={this.placeSubmitHandler}/>
                </View>
                <View>
                    {placesOutput}
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
