import React, { Component } from 'react'
import { View, Text, Button, TextInput, StyleSheet } from 'react-native'

import startMainTabs from '../MainTabs/startMainTabs'

class AuthScreen extends Component {

    loginHandler = () => {
        startMainTabs()
    }

    render(){
        return(
            <View style={styles.container}>
                <Text>Please Log In</Text>
                <Button title="Switch To Login" />
                <TextInput placeholder="Your Email" />
                <TextInput placeholder="Password" />
                <TextInput placeholder="Confirm Password" />
                <Button title="Submit" onPress={this.loginHandler} />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
})

export default AuthScreen