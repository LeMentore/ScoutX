import React from 'react'
import { AppRegistry } from 'react-native'
import { Navigation } from 'react-native-navigation'
import { Provider } from 'react-redux'

import App from './App'
import configureStore from './src/store/configureStore'

const store = configureStore()

const Main = () => (
    <Provider store={store}>
        <App />
    </Provider>
)

Navigation.registerComponent('ScoutX', () => Main)

App()