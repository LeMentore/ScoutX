import { Navigation } from 'react-native-navigation'
import { Provider } from 'react-redux'

import AuthScreen from './src/screens/Auth/Auth'
import SharePlaceScreen from './src/screens/SharePlace/SharePlace'
import FindPlaceScreen from './src/screens/FindPlace/FindPlace'
import configureStore from './src/store/configureStore'

const store = configureStore();

// Register Screens
Navigation.registerComponent('scout-x.AuthScreen', () => AuthScreen, store, Provider)
Navigation.registerComponent('scout-x.SharePlaceScreen', () => SharePlaceScreen, store, Provider)
Navigation.registerComponent('scout-x.FindPlaceScreen', () => FindPlaceScreen, store, Provider)

// Start App
Navigation.startSingleScreenApp({
    screen: {
        screen: 'scout-x.AuthScreen',
        title: 'Login'
    }
})