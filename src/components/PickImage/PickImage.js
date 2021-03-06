import React, { Component } from 'react'
import { View, Image, StyleSheet } from 'react-native'
import ImagePicker from 'react-native-image-picker'
import ButtonWithBackground from '../UI/ButtonWithBackground/ButtonWithBackground'

class PickImage extends Component {
    state = {
        pickedImage: null
    }

    reset = () => {
        this.setState({
            pickedImage: null
        })
    }

    pickImageHandler = () => {
        ImagePicker.showImagePicker({title: 'Прикрепить фото', maxWidth: 800, maxHeight: 600}, response => {
            if(response.didCancel){
                console.log('User canceled!')
            } else if(response.error){
                console.log('Error ', response.error)
            } else {
                this.setState({
                    pickedImage: { uri: response.uri }
                })
                this.props.onImagePicked({uri: response.uri, base64: response.data})
            }
        })
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.placeholder}>
                    <Image source={this.state.pickedImage} style={styles.previewImage}/>
                </View>
                <View style={styles.button}>
                    <ButtonWithBackground color='#e91e63' onPress={this.pickImageHandler}>Прикрепить фото</ButtonWithBackground>
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
    placeholder: {
        borderWidth: 1,
        borderColor: '#e91e63',
        backgroundColor: '#434343',
        width: '90%',
        height: 200
    },
    button: {
        margin: 8
    },
    previewImage: {
        width: '100%',
        height: '100%'
    }
})

export default PickImage
