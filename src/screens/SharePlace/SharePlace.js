import React, { Component } from 'react'
import { View, Text, Button, StyleSheet, ScrollView, Image } from 'react-native'
import { connect } from 'react-redux'

import { addPlace } from "../../store/actions/places"
import MainText from '../../components/UI/MainText/MainText'
import HeadingText from '../../components/UI/HeadingText/HeadingText'
import PlaceInput from '../../components/PlaceInput/PlaceInput'
import PickImage from '../../components/PickImage/PickImage'
import PickLocation from '../../components/PickLocation/PickLocation'

class SharePlaceScreen extends Component {
    state = {
        placeName: ''
    }

    constructor(props){
        super(props)
        this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent)
    }

    onNavigatorEvent = event => {
        if(event.type === 'NavBarButtonPress'){
            if(event.id === 'sideDrawerToggle'){
                this.props.navigator.toggleDrawer({
                    side: 'left'
                })
            }
        }
    }

    placeNameChangedHandler = value => {
        this.setState({
            placeName: value
        })
    }

    placeAddedHandler = () => {
        if (this.state.placeName.trim() !== '')
            this.props.onAddPlace(this.state.placeName)
    }

    render(){
        return(
            <ScrollView>
                <View style={styles.container}>
                    <MainText>
                        <HeadingText style={{color: '#000'}}>Share place with us!</HeadingText>
                    </MainText>

                    <PickImage />
                    <PickLocation />
                    <PlaceInput placeName={this.state.placeName} onChangeText={this.placeNameChangedHandler} />

                    <View style={styles.button}>
                        <Button title="Share the place" onPress={this.placeAddedHandler} />
                    </View>
                </View>
            </ScrollView>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center'
    },
    button: {
        margin: 8
    }
})

const mapDispatchToProps = dispatch => {
    return {
        onAddPlace: placeName => dispatch(addPlace(placeName))
    }
}

export default connect(null, mapDispatchToProps)(SharePlaceScreen)