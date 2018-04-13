import React, { Component } from 'react'
import { View, Text, Button, StyleSheet, Dimensions } from 'react-native'
import MapView from 'react-native-maps'

class PickLocation extends Component {
    state = {
        focusedLocation: {
            latitude: 37.7900352,
            longitude: -122.4013726,
            latitudeDelta: 0.0122,
            longitudeDelta: Dimensions.get('window').width / Dimensions.get('window').height * 0.0122
        }
    }

    pickLocationHandler = event => {
        const coordinates = event.nativeEvent.coordinate
        this.setState(prevState => {
            return {
                focusedLocation: {
                    ...prevState.focusedLocation,
                    latitude: coordinates.latitude,
                    longitude: coordinates.longitude
                }
            }
        })
    }

    render() {
        return (
            <View style={styles.container}>
                <MapView initialRegion={this.state.focusedLocation}
                         region={this.state.focusedLocation}
                         onPress={this.pickLocationHandler} style={styles.map}
                />
                <View style={styles.button}>
                    <Button title="Locate Me" onPress={() => alert('Ты пидор!')} />
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        alignItems: 'center'
    },
    map: {
        width: '100%',
        height: 250
    },
    button: {
        margin: 8
    }
})

export default PickLocation
