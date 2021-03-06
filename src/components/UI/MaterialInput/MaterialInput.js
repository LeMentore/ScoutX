import React from 'react'
import { TextField } from 'react-native-material-textfield'
import { StyleSheet } from 'react-native'

const MaterialInput = props => (
    <TextField {...props}
               baseColor="#e91e63" tintColor="#e91e63" textColor="#e91e63"
               style={[styles.input, props.style, (!props.valid && props.touched) && styles.invalid]}
    />
)

const styles = StyleSheet.create({
    input: {
        width: '100%'
    },
    invalid: {
        color: '#e91e63',
        backgroundColor: 'rgba(233, 30, 99, 0.1)',
        height: '100%'
    }
})

export default MaterialInput