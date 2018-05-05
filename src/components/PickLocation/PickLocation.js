import React, { Component } from 'react'
import { View, Text, Button, StyleSheet, Dimensions } from 'react-native'
import MapView from 'react-native-maps'
import ButtonWithBackground from '../UI/ButtonWithBackground/ButtonWithBackground'

class PickLocation extends Component {
    componentWillMount(){
        this.reset()
    }

    reset = () => {
        this.setState({
            focusedLocation: {
                latitude: 37.7900352,
                longitude: -122.4013726,
                latitudeDelta: 0.0122,
                longitudeDelta: Dimensions.get('window').width / Dimensions.get('window').height * 0.0122
            },
            locationChosen: false
        })
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
        this.props.onLocationPick({
            latitude: coordinates.latitude,
            longitude: coordinates.longitude
        })
    }

    getLocationHandler = () => {
        navigator.geolocation.getCurrentPosition(position => {
            const coordinatesEvent = {
                nativeEvent: {
                    coordinate: {
                        latitude: position.coords.latitude,
                        longitude: position.coords.longitude
                    }
                }
            }
            this.pickLocationHandler(coordinatesEvent)
        },
            error => {
                console.log(error)
                alert('Загрузка местоположения не удалась')
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
                         region={!this.state.locationChosen ? this.state.focusedLocation : null}
                         onPress={this.pickLocationHandler}
                         ref={ref => this.map = ref} style={styles.map}>
                    {marker}
                </MapView>
                <View style={styles.button}>
                    <ButtonWithBackground color='#e91e63' onPress={this.getLocationHandler}>Найти меня</ButtonWithBackground>
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
        width: '90%',
        height: 250
    },
    button: {
        margin: 8
    }
})

export default PickLocation
