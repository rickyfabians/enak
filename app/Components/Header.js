import React from 'react'
import { TouchableOpacity } from 'react-native'
import { View, Text } from 'react-native-animatable'
import Icon from 'react-native-vector-icons/Feather'

// Styling
import styles from './Styles/HeaderStyle'

const Header = props => {
  return <View useNativeDriver animation='fadeInDown' easing='ease-out-expo' style={styles.container}>
    {/* <Text useNativeDriver animation='fadeIn' easing='ease-in-back' style={styles.dateText}>{moment().format('dddd, D MMM YYYY')}</Text> */}
    <TouchableOpacity onPress={() => props.navigation.navigate('Search')} >
      <View useNativeDriver animation='fadeIn' easing='ease-in-back' style={styles.searchBox}>
        <Icon name={'search'} size={14} color={'#16a085'} style={{ paddingRight: 70 }} />
        <Text style={{ color: '#16a085' }}>Search for an Seafood...</Text>
      </View>
    </TouchableOpacity>
  </View>
}

export default Header
