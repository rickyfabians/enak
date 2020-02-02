import * as React from 'react'
import { View, Text, TouchableOpacity } from 'react-native'
import Tab from './Tab'

const TabBar = (props) => {
  const { navigationState, navigation } = props
  return (
    <View style={{
      height: 50,
      flexDirection: 'row',
      backgroundColor: '#16a085',
      justifyContent: 'space-around',
      alignItems: 'center',
      borderTopLeftRadius: 30,
      overflow: 'hidden'
      // shadowOffset: { width: 0, height: 2 },
      // shadowOpacity: 0.8,
      // shadowRadius: 2,
      // elevation: 1,
    }}>
      {navigationState.routes.map((route, index) => {
        // const focusAnim = position.interpolate({
        //   inputRange: [index - 1, index, index + 1],
        //   outputRange: [0, 1, 0]
        // })
        return (
          <Tab
            // focusAnim={focusAnim}
            index={index}
            focus={navigationState.index}
            title={route.routeName}
            onPress={() => navigation.navigate(route.routeName)}
          />
        )
      })}
      <TouchableOpacity onPress={() => {
        // toggle drawer or dispatch any other arbitrary action
        // alert('mmm... Yummy!!')
      }}>
        <Text>🍔</Text>
      </TouchableOpacity>
    </View>
  )
}

export default TabBar
