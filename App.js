import { Navigation } from 'react-native-navigation'
import AuthScreen from './src/screens/Auth/Auth'
import SharePlaceScreen from './src/screens/SharePlace/SharePlace'
import FindPlaceScreen from './src/screens/FindPlace/FindPlace'

// Register Screens
Navigation.registerComponent('scout-x.AuthScreen', () => AuthScreen)
Navigation.registerComponent('scout-x.SharePlaceScreen', () => SharePlaceScreen)
Navigation.registerComponent('scout-x.FindPlaceScreen', () => FindPlaceScreen)

// Start App
Navigation.startSingleScreenApp({
    screen: {
        screen: 'scout-x.AuthScreen',
        title: 'Login'
    }
})