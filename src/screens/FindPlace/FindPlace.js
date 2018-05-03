import React, { Component } from 'react'
import { View, Text, TouchableOpacity, StyleSheet, Animated } from 'react-native'
import { connect } from 'react-redux'

import PlaceList from '../../components/PlaceList/PlaceList'
import { getPlaces } from '../../store/actions/places'

class FindPlaceScreen extends Component {
    constructor(props){
        super(props)
        this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent)
    }

    state = {
        placesLoaded: false,
        removeAnimation: new Animated.Value(1),
        placesAnimation: new Animated.Value(0)
    }

    static navigatorStyle = {
        navBarBackgroundColor: '#191919',
        navBarButtonColor: '#e91e63',
        navBarTextColor: '#e91e63'
    }

    onNavigatorEvent = event => {
        if(event.type === 'ScreenChangedEvent'){
            if(event.id === 'willAppear'){
                this.props.onLoadPlaces()
                // this.setState({
                //     placesLoaded: false
                // })
            }
        }
        if(event.type === 'NavBarButtonPress'){
            if(event.id === 'sideDrawerToggle'){
                this.props.navigator.toggleDrawer({
                    side: 'left'
                })
            }
        }
    }

    placesLoadedHandler = () => {
        Animated.timing(this.state.placesAnimation, {
            toValue: 1,
            duration: 500,
            useNativeDriver: true
        }).start()
    }

    placesSearchHandler = () => {
        Animated.timing(this.state.removeAnimation, {
            toValue: 0,
            duration: 500,
            useNativeDriver: true
        }).start(() => {
            this.setState({
                placesLoaded: true
            })
            this.placesLoadedHandler()
        })
    }

    itemSelectedHandler = key => {
        const selPlace = this.props.places.find(place => {
            return place.key === key
        })
        this.props.navigator.push({
            screen: 'scout-x.PlaceDetailScreen',
            title: selPlace.name,
            passProps: {
                selectedPlace: selPlace
            }
        })
    }

    render(){
        let content = (
            <Animated.View style={{
                opacity: this.state.removeAnimation,
                transform: [
                    {
                        scale: this.state.removeAnimation.interpolate({
                            inputRange: [0, 1],
                            outputRange: [30, 1]
                        })
                    }
                ]
            }}>
                <TouchableOpacity onPress={this.placesSearchHandler}>
                    <View style={styles.searchButton}>
                        <Text style={styles.searchButtonText}>Find Places</Text>
                    </View>
                </TouchableOpacity>
            </Animated.View>
        )
        if (this.state.placesLoaded) {
            content = (
                <Animated.View style={{opacity: this.state.placesAnimation}}>
                    <PlaceList places={this.props.places} onItemSelected={this.itemSelectedHandler}/>
                </Animated.View>
            )
        }
        return <View style={this.state.placesLoaded ? styles.defaultContainer : styles.buttonContainer}>{content}</View>
    }
}

const styles = StyleSheet.create({
    defaultContainer: {
        flex: 1,
        backgroundColor: '#1f1f1f'
    },
    buttonContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#1f1f1f'
    },
    searchButton: {
        borderColor: '#e91e63',
        borderWidth: 2,
        borderRadius: 50,
        padding: 20
    },
    searchButtonText: {
        color: '#e91e63',
        fontWeight: 'bold',
        fontSize: 26
    }
})

const mapStateToProps = state => {
    return {
        places: state.places.places
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onLoadPlaces: () => dispatch(getPlaces())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(FindPlaceScreen)