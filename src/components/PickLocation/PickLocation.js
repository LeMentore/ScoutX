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
        },
        locationChosen: false
    }

    pickLocationHandler = event => {
        const coordinates = event.nativeEvent.coordinate
        this.map.animateToRegion({
            ...this.state.focusedLocation,
            latitude: coordinates.latitude,
            longitude: coordinates.longitude
        })
        this.setState(prevState => {
            return {
                focusedLocation: {
                    ...prevState.focusedLocation,
                    latitude: coordinates.latitude,
                    longitude: coordinates.longitude
                },
                locationChosen: true
            }
        })
    }

    render() {
        let marker = null
        if(this.state.locationChosen){
            marker = <MapView.Marker coordinate={this.state.focusedLocation}/>
        }

        return (
            <View style={styles.container}>
                <MapView initialRegion={this.state.focusedLocation}
                         onPress={this.pickLocationHandler}
                         ref={ref => this.map = ref} style={styles.map}>
                    {marker}
                </MapView>
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
