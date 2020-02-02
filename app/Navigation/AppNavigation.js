import React from 'react'
import { createStackNavigator } from 'react-navigation-stack'
import { createMaterialTopTabNavigator } from 'react-navigation-tabs'
import { createAppContainer } from 'react-navigation'
import { Text, Animated } from 'react-native'
import TabBar from './TabBar'
import Home from '../Screens/Home'
import Bookmark from '../Screens/Bookmark'
import Search from '../Screens/Search'
import FoodDetails from '../Screens/FoodDetails'
// import Icon from 'react-native-vector-icons/FontAwesome'
// import { fromLeft, zoomIn, zoomOut } from 'react-navigation-transitions'

// const handleCustomTransition = ({ scenes }) => {
//   const prevScene = scenes[scenes.length - 2]
//   const nextScene = scenes[scenes.length - 1]

//   // Custom transitions go there
//   if (prevScene &&
//     prevScene.route.routeName === 'ScreenA' &&
//     nextScene.route.routeName === 'ScreenB') {
//     return zoomIn()
//   } else if (prevScene &&
//     prevScene.route.routeName === 'ScreenB' &&
//     nextScene.route.routeName === 'ScreenC') {
//     return zoomOut()
//   }
//   return fromLeft()
// }

const AppNavigator = createMaterialTopTabNavigator(
  {
    Home: {
      screen: Home,
      navigationOptions: {
        tabBarIcon: (v) => (
          <Text style={{ color: v.tintColor }}>Feed</Text>
        )
      }
    },
    Bookmark: {
      screen: Bookmark,
      navigationOptions: {
        tabBarIcon: (v) => (
          <Text style={{ color: v.tintColor }}>Bookmark</Text>
        )
      }
    },
    Author: {
      screen: () => null,
      navigationOptions: {
        tabBarIcon: (v) => (
          <Text style={{ color: v.tintColor }}>🍔</Text>
        )
      }
    }
  },
  {
    swipeEnabled: true,
    animationEnabled: true,
    tabBarPosition: 'bottom',
    headerMode: 'none',
    // transitionConfig: () => zoomIn(),
    // tabBarComponent: TabBar,
    initialRouteName: 'Home',
    tabBarOptions: {
      showIcon: true,
      showLabel: false,
      upperCaseLabel: false,
      activeTintColor: '#FFFFFF',
      inactiveTintColor: '#D4DCE6',
      iconStyle: {
        width: '100%'
      },
      tabStyle: {
        height: 40
      },
      style: {
        // marginHorizontal: 10,
        borderTopLeftRadius: 20,
        // backgroundColor: 'white',
        backgroundColor: '#16a085'

      },
      indicatorStyle: {
        backgroundColor: '#FFFFFF',
        // top: 0,
        // backgroundColor: '#16a085',
        height: 5,
        borderRadius: 30
        // backgroundColor: '#ff6900'
      }
    }
  }
)

const PrimaryNav = createStackNavigator({
  Home: { screen: AppNavigator },
  FoodDetails: { screen: FoodDetails },
  Search: { screen: Search }
}, {
  // Default config for all screens
  headerMode: 'none',
  initialRouteName: 'Home',
  transitionConfig: () => ({
    transitionSpec: {
      duration: 0,
      timing: Animated.timing,
      opacity: 0
    }
  })
})

export default createAppContainer(PrimaryNav)
