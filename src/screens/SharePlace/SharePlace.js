import React, { Component } from 'react'
import { View, StyleSheet, ScrollView, ActivityIndicator } from 'react-native'
import { connect } from 'react-redux'

import { addPlace, startAddPlace } from "../../store/actions/places"
import MainText from '../../components/UI/MainText/MainText'
import HeadingText from '../../components/UI/HeadingText/HeadingText'
import ButtonWithBackground from '../../components/UI/ButtonWithBackground/ButtonWithBackground'
import PlaceInput from '../../components/PlaceInput/PlaceInput'
import PickImage from '../../components/PickImage/PickImage'
import PickLocation from '../../components/PickLocation/PickLocation'
import validate from '../../utility/validation'

class SharePlaceScreen extends Component {
    constructor(props){
        super(props)
        this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent)
    }

    static navigatorStyle = {
        navBarBackgroundColor: '#191919',
        navBarButtonColor: '#e91e63',
        navBarTextColor: '#e91e63'
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

    componentDidUpdate(){
        if(this.props.placeAdded){
            this.props.navigator.switchToTab({tabIndex: 0})
            // this.props.onStartAddPlace()
        }
    }


    onNavigatorEvent = event => {
        if(event.type === 'ScreenChangedEvent'){
            if(event.id === 'willAppear'){
                this.props.onStartAddPlace()
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
        // this.props.navigator.switchToTab({ tabIndex: 0 })
    }

    render(){
        let submitButton = (
            <ButtonWithBackground onPress={this.placeAddedHandler} color='#e91e63'
                    disabled={!this.state.controls.placeName.valid
                    || !this.state.controls.location.valid
                    || !this.state.controls.image.valid} >Сохранить место</ButtonWithBackground>
        )

        if (this.props.isLoading){
            submitButton = <ActivityIndicator />
        }
        return(
            <ScrollView>
                <View style={styles.container}>
                    <MainText>
                        <HeadingText style={styles.header}>Разведка нового места!</HeadingText>
                    </MainText>

                    <PickImage onImagePicked={this.imagePickerHandler} ref={ref => (this.imagePicker = ref)} />
                    <PickLocation onLocationPick={this.locationPickHandler} ref={ref => (this.locationPicker = ref)} />
                    <View style={{width: '90%'}}>
                        <PlaceInput placeName={this.state.placeName} onChangeText={this.placeNameChangedHandler} />
                    </View>

                    <View style={styles.button}>
                        {submitButton}
                    </View>
                </View>
            </ScrollView>
        )
    }
}

const styles = StyleSheet.create({
    header: {
        color: '#e91e63'
    },
    container: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: '#1f1f1f'
    },
    placeholder: {
        borderWidth: 1,
        borderColor: 'black',
        backgroundColor: '#eee',
        width: '80%',
        height: 150
    },
    button: {
        margin: 8
    },
    previewImage: {
        width: '100%',
        height: '100%'
    }
})

const mapStateToProps = state => {
    return {
        isLoading: state.ui.isLoading,
        placeAdded: state.places.placeAdded
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onAddPlace: (placeName, location, image) => dispatch(addPlace(placeName, location, image)),
        onStartAddPlace: () => dispatch(startAddPlace())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SharePlaceScreen)