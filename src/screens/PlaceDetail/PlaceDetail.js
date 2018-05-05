import React, { Component } from 'react'
import { View, Image, Text, StyleSheet, TouchableOpacity, Platform, Dimensions } from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons'
import MapView from "react-native-maps";
import { connect } from 'react-redux'

import { deletePlace } from '../../store/actions/places'

class PlaceDetail extends Component {
    constructor(props) {
        super(props);
        Dimensions.addEventListener("change", this.updateStyles);
    }

    state = {
        viewMode: "portrait"
    };

    static navigatorStyle = {
        navBarBackgroundColor: '#191919',
        navBarButtonColor: '#e91e63',
        navBarTextColor: '#e91e63'
    }

    componentWillUnmount() {
        Dimensions.removeEventListener("change", this.updateStyles);
    }

    updateStyles = dimension => {
        this.setState({
            viewMode: dimension.window.height > 500 ? 'portrait' : 'landscape'
        })
    }

    placeDeletedHandler = () => {
        this.props.onDeletePlace(this.props.selectedPlace.key)
        this.props.navigator.pop()
    }

    render(){
        return(
            <View style={[styles.container, this.state.viewMode === "portrait" ? styles.portraitContainer : styles.landscapeContainer]}>
                <View style={styles.placeDetailContainer}>
                    <View style={styles.subContainer}>
                        <Image source={this.props.selectedPlace.image} style={styles.placeImage}/>
                    </View>
                    <View style={styles.subContainer}>
                        <MapView initialRegion={{
                            ...this.props.selectedPlace.location,
                            latitudeDelta: 0.0122,
                            longitudeDelta: Dimensions.get("window").width / Dimensions.get("window").height * 0.0122
                        }}
                            style={styles.map}>
                            <MapView.Marker coordinate={this.props.selectedPlace.location} />
                        </MapView>
                    </View>
                </View>

                <View style={styles.subContainer}>
                    <View>
                        <Text style={styles.placeName}>
                            {this.props.selectedPlace.name}
                        </Text>
                    </View>
                    <View>
                        <TouchableOpacity onPress={this.placeDeletedHandler}>
                            <View style={styles.deleteButton}>
                                <Icon size={30} name={Platform.OS === "android" ? "md-trash" : "ios-trash"} color="#eee"/>
                            </View>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        padding: 22,
        flex: 1,
        backgroundColor: '#1f1f1f'
    },
    portraitContainer: {
        flexDirection: 'column'
    },
    landscapeContainer: {
        flexDirection: 'row'
    },
    placeDetailContainer: {
        flex: 2
    },
    placeImage: {
        width: '100%',
        height: '100%'
    },
    placeName: {
        fontWeight: 'bold',
        textAlign: 'center',
        fontSize: 28,
        color: '#e91e63'
    },
    map: {
        ...StyleSheet.absoluteFillObject
    },
    deleteButton: {
        alignItems: 'center'
    },
    subContainer: {
        flex: 1
    }
})

const mapDispatchToProps = dispatch => {
    return {
        onDeletePlace: key => dispatch(deletePlace(key))
    }
}

export default connect(null, mapDispatchToProps)(PlaceDetail)