import React, { Component } from 'react'
import { View, StyleSheet, ImageBackground, Dimensions } from 'react-native'

import startMainTabs from '../MainTabs/startMainTabs'
import DefaultInput from '../../components/UI/DefaultInput/DefaultInput'
import HeadingText from '../../components/UI/HeadingText/HeadingText'
import MainText from '../../components/UI/MainText/MainText'
import ButtonWithBackground from '../../components/UI/ButtonWithBackground/ButtonWithBackground'
import backgroundImage from '../../assets/background.jpg'

class AuthScreen extends Component {

    state = {
        responsive: {
            containerDirection: 'column',
            containerJustifyContent: 'flex-start',
            wrapperWidth: '100%'
        }
    }

    constructor(props){
        super(props)
        Dimensions.addEventListener('change', () => {
            this.setState({
                responsive: {
                    containerDirection: Dimensions.get('window').height > 500 ? 'column' : 'row',
                    containerJustifyContent: Dimensions.get('window').height > 500 ? 'flex-start' : 'space-between',
                    wrapperWidth: Dimensions.get('window').height > 500 ? '100%' : '48%'
                }
            })
        })
    }

    loginHandler = () => {
        startMainTabs()
    }

    render() {
        let headingText = null
        if(Dimensions.get('window').height > 500){
            headingText = (
                <MainText>
                    <HeadingText>Please Log In</HeadingText>
                </MainText>
            )
        }
        return (
            <ImageBackground source={backgroundImage} style={styles.backgroundImage}>
                <View style={styles.container}>
                    {headingText}
                    <ButtonWithBackground color="#29aaf4" onPress={() => alert('Ты пидор!')}>Switch To Login</ButtonWithBackground>
                    <View style={styles.inputContainer}>
                        <DefaultInput placeholder="Your Email" style={styles.input}/>
                        <View style={{
                            flexDirection: this.state.responsive.containerDirection,
                            justifyContent: this.state.responsive.containerJustifyContent
                        }}>
                            <View style={{width: this.state.responsive.wrapperWidth}}><DefaultInput placeholder="Password" style={styles.input}/></View>
                            <View style={{width: this.state.responsive.wrapperWidth}}><DefaultInput placeholder="Confirm Password" style={styles.input}/></View>
                        </View>
                    </View>
                    <ButtonWithBackground color="#29aaf4" onPress={this.loginHandler}>Submit</ButtonWithBackground>
                </View>
            </ImageBackground>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    inputContainer:{
        width: '80%'
    },
    backgroundImage: {
        width: '100%',
        flex: 1
    },
    input: {
        backgroundColor: '#eee',
        borderColor: '#bbb'
    },
    passwordWrapper: {
        width: Dimensions.get('window').height > 500 ? '100%' : '48%'
    },
    passwordContainer: {
        flexDirection: Dimensions.get('window').height > 500 ? 'column': 'row',
        justifyContent: 'space-between'
    }
})

export default AuthScreen