// import React, { Component } from 'react'
import { createStackNavigator } from 'react-navigation-stack'
// import { createBottomTabNavigator, BottomTabBar } from 'react-navigation-tabs'
import { createAppContainer } from 'react-navigation'
import Home from '../Screens/Home'
import Search from '../Screens/Search'
import FoodDetails from '../Screens/FoodDetails'
// import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
const PrimaryNav = createStackNavigator({
  Home: { screen: Home },
  FoodDetails: { screen: FoodDetails },
  Search: { screen: Search }
}, {
  // Default config for all screens
  headerMode: 'none',
  initialRouteName: 'Home'
})

export default createAppContainer(PrimaryNav)
