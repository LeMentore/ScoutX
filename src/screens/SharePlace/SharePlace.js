import React, { Component } from 'react'
import { View, Button, StyleSheet, ScrollView } from 'react-native'
import { connect } from 'react-redux'

import { addPlace } from "../../store/actions/places"
import MainText from '../../components/UI/MainText/MainText'
import HeadingText from '../../components/UI/HeadingText/HeadingText'
import PlaceInput from '../../components/PlaceInput/PlaceInput'
import PickImage from '../../components/PickImage/PickImage'
import PickLocation from '../../components/PickLocation/PickLocation'
import validate from "../../utility/validation";

class SharePlaceScreen extends Component {
    constructor(props){
        super(props)
        this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent)
    }

    state = {
        controls: {
            placeName: {
                value: "",
                valid: false,
                touched: false,
                validationRules: {
                    notEmpty: true
                }
            }
        }
    }

    static navigatorStyle = {
        navBarButtonColor: '#1289c5'
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
        this.setState(prevState => {
            return {
                controls: {
                    ...prevState.controls,
                    placeName: {
                        ...prevState.controls.placeName,
                        value: value,
                        valid: validate(value, prevState.controls.placeName.validationRules),
                        touched: true
                    }
                }
            };
        });
    }

    placeAddedHandler = () => {
        if (this.state.controls.placeName.value.trim() !== '')
            this.props.onAddPlace(this.state.controls.placeName.value)
    }

    render(){
        return(
            <ScrollView>
                <View style={styles.container}>
                    <MainText>
                        <HeadingText style={styles.header}>Share place with us!</HeadingText>
                    </MainText>

                    <PickImage />
                    <PickLocation />
                    <PlaceInput placeName={this.state.placeName} onChangeText={this.placeNameChangedHandler} />

                    <View style={styles.button}>
                        <Button title="Share the place" onPress={this.placeAddedHandler} disabled={!this.state.controls.placeName.valid}/>
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
    },
    header: {
        color: '#000'
    }
})

const mapDispatchToProps = dispatch => {
    return {
        onAddPlace: placeName => dispatch(addPlace(placeName))
    }
}

export default connect(null, mapDispatchToProps)(SharePlaceScreen)