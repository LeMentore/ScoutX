import { Navigation } from 'react-native-navigation'
import AuthScreen from './src/screens/Auth/Auth'

// Register Screens
Navigation.registerComponent('scout-x.AuthScreen', () => AuthScreen)

// Start App
Navigation.startSingleScreenApp({
    screen: {
        screen: 'scout-x.AuthScreen',
        title: 'Login'
    }
})