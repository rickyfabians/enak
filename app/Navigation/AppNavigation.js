import React from 'react'
import { createStackNavigator, TransitionPresets } from 'react-navigation-stack'
import { createMaterialTopTabNavigator } from 'react-navigation-tabs'
import { createAppContainer } from 'react-navigation'
import { Text, Animated } from 'react-native'
// import TabBar from './TabBar'
import Home from '../Screens/Home'
import Bookmark from '../Screens/Bookmark'
import Search from '../Screens/Search'
import FoodDetails from '../Screens/FoodDetails'
// import Icon from 'react-native-vector-icons/FontAwesome'

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
    onTransitionStart: () => ({
      transitionSpec: {
        duration: 0,
        timing: Animated.timing
      }
    }),
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
  Search: {
    screen: Search,
    navigationOptions: {
      gestureEnabled: true,
      cardOverlayEnabled: true,
      ...TransitionPresets.ModalSlideFromBottomIOS
    }
  }
}, {
  // Default config for all screens
  headerMode: 'none',
  initialRouteName: 'Home'
})

export default createAppContainer(PrimaryNav)
