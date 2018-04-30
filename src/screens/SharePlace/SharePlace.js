import React, { Component } from 'react'
import { View, Button, Text, StyleSheet, ScrollView, ActivityIndicator } from 'react-native'
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

    static navigatorStyle = {
        navBarButtonColor: '#1289c5'
    }

    componentWillMount(){
        this.reset()
    }

    reset = () => {
        this.setState({
            controls: {
                placeName: {
                    value: "",
                    valid: false,
                    touched: false,
                    validationRules: {
                        notEmpty: true
                    }
                },
                location: {
                    value: null,
                    valid: false
                },
                image: {
                    value: null,
                    valid: false
                }
            }
        })
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

    locationPickHandler = location => {
        this.setState(prevState => {
            return {
                controls: {
                    ...prevState.controls,
                    location: {
                        value: location,
                        valid: true
                    }
                }
            }
        })
    }

    imagePickerHandler = image => {
        this.setState(prevState => {
            return {
                controls: {
                    ...prevState.controls,
                    image: {
                        value: image,
                        valid: true
                    }
                }
            }
        })
    }

    placeAddedHandler = () => {
        this.props.onAddPlace(
            this.state.controls.placeName.value,
            this.state.controls.location.value,
            this.state.controls.image.value
        )
        this.reset()
        this.imagePicker.reset()
        this.locationPicker.reset()
    }

    render(){
        let submitButton = (
            <Button title="Share the place" onPress={this.placeAddedHandler}
                    disabled={!this.state.controls.placeName.valid
                    || !this.state.controls.location.valid
                    || !this.state.controls.image.valid} />
        )

        if (this.props.isLoading){
            submitButton = <ActivityIndicator />
        }
        return(
            <ScrollView>
                <View style={styles.container}>
                    <MainText>
                        <HeadingText style={styles.header}>Share place with us!</HeadingText>
                    </MainText>

                    <PickImage onImagePicked={this.imagePickerHandler} ref={ref => (this.imagePicker = ref)} />
                    <PickLocation onLocationPick={this.locationPickHandler} ref={ref => (this.locationPicker = ref)} />
                    <PlaceInput placeName={this.state.placeName} onChangeText={this.placeNameChangedHandler} />

                    <View style={styles.button}>
                        {submitButton}
                    </View>
                </View>
            </ScrollView>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center"
    },
    placeholder: {
        borderWidth: 1,
        borderColor: "black",
        backgroundColor: "#eee",
        width: "80%",
        height: 150
    },
    button: {
        margin: 8
    },
    previewImage: {
        width: "100%",
        height: "100%"
    }
})

const mapStateToProps = state => {
    return {
        isLoading: state.ui.isLoading
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onAddPlace: (placeName, location, image) => dispatch(addPlace(placeName, location, image))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SharePlaceScreen)