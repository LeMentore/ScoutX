import { Navigation } from 'react-native-navigation'
import { Platform } from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons'

const startTabs = () => {
    Promise.all([
        Icon.getImageSource(Platform.OS === 'android' ? 'md-map' : 'ios-map', 30),
        Icon.getImageSource(Platform.OS === 'android' ? 'md-share-alt' : 'ios-share-alt', 30),
        Icon.getImageSource(Platform.OS === 'android' ? 'md-menu' : 'ios-menu', 30)
    ])
        .then(sources => {
        Navigation.startTabBasedApp({
            tabs: [
                {
                    screen: 'scout-x.FindPlaceScreen',
                    label: 'Разведано',
                    title: 'Разведано',
                    icon: sources[0],
                    navigatorButtons: {
                        leftButtons: [
                            {
                                icon: sources[2],
                                title: 'Menu',
                                id: 'sideDrawerToggle'
                            }
                        ]
                    }
                },
                {
                    screen: 'scout-x.SharePlaceScreen',
                    label: 'Новое место',
                    title: 'Новое место',
                    icon: sources[1],
                    navigatorButtons: {
                        leftButtons: [
                            {
                                icon: sources[2],
                                title: 'Menu',
                                id: 'sideDrawerToggle'
                            }
                        ]
                    }
                }
            ],
            tabsStyle: {
                tabBarSelectedButtonColor: '#e91e63'
            },
            appStyle: {
                tabBarSelectedButtonColor: '#e91e63',
                tabBarBackgroundColor: '#191919'
            },
            drawer: {
                left: {
                    screen: 'scout-x.SideDrawer'
                }
            }
        })
    })
}

export default startTabs