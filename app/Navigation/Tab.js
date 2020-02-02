import * as React from 'react'
import { Animated, TouchableOpacity } from 'react-native'

const Tab = ({ focusAnim, title, onPress, focus, index }) => {
  let styleView = {}
  let styleText = {}
  console.log('focus', focus, index, focus === index)
  if (focus === index) {
    styleView = { ...styleView, backgroundColor: '#16a085' }
    styleText = { ...styleText, color: 'white' }
  }
  return (
    <TouchableOpacity key={index} onPress={onPress}>
      <Animated.View
        style={[{
          paddingVertical: 5,
          paddingHorizontal: 10,
          borderRadius: 30
        //   backgroundColor: focusAnim.interpolate({
        //     inputRange: [0, 1],
        //     outputRange: ["transparent", "tomato"]
        //   })
        }, styleView]}
      >
        <Animated.Text style={[styleText]}>{title}</Animated.Text>
      </Animated.View>
    </TouchableOpacity>
  )
}

export default Tab
