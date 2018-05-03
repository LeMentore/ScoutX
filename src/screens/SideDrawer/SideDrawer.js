import React, { Component } from 'react'
import { connect } from 'react-redux'
import { View, Text, Dimensions, StyleSheet, TouchableOpacity } from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons'
import { authLogout } from '../../store/actions/auth'

class SideDrawer extends Component {
    render(){
        return(
            <View style={[styles.container, { width: Dimensions.get('window').width * 0.8 }]}>
                <TouchableOpacity onPress={this.props.onLogout}>
                    <View style={styles.drawerItem}>
                        <Icon name="ios-log-out" size={30} color="#aaa" style={styles.drawerItemIcon} />
                        <Text style={styles.text}>Выйти отсюда</Text>
                    </View>
                </TouchableOpacity>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        paddingTop: 56,
        flex: 1,
        backgroundColor: '#1f1f1f'
    },
    drawerItem: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 10,
        backgroundColor: '#2c2c2c'
    },
    drawerItemIcon: {
        marginRight: 10
    },
    text: {
        color: '#e91e63'
    }
})

const mapDispatchToProps = dispatch => {
    return {
        onLogout: () => dispatch(authLogout())
    }
}

export default connect(null, mapDispatchToProps)(SideDrawer)