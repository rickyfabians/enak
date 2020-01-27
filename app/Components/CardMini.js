import React from 'react'
import { ImageBackground, TouchableWithoutFeedback } from 'react-native'
import { View, Text } from 'react-native-animatable'
import Icon from 'react-native-vector-icons/Feather'

// Styling
import styles from './Styles/CardMiniStyle'
import globalStyles from '../Styles/GlobalStyle'

const CardMini = props => {
  const { item, navigation, grid } = props
  let imageSize = grid ? styles.backgroundImageGrid : styles.backgroundImage
  return <TouchableWithoutFeedback onPress={() => navigation.navigate('FoodDetails', { item })} >
    <View useNativeDriver animation='fadeInUpBig' easing='ease-out-expo' style={styles.container}>
      <ImageBackground source={{ uri: item.strMealThumb }}
        imageStyle={{ borderRadius: 10 }}
        style={[globalStyles.boxShadow, imageSize]}>
        <View style={styles.boxBottom}>
          <Text style={[styles.title, globalStyles.textShadow, { color: 'white', flex: 1 }]}>{item.strMeal}</Text>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Icon name='heart' color='white' size={12} style={globalStyles.textShadow} />
            <Text style={[globalStyles.textShadow, { fontSize: 12, paddingLeft: 4, color: 'white' }]}>{Math.floor(Math.random() * 100)}</Text>
          </View>
        </View>
      </ImageBackground>
    </View>
  </TouchableWithoutFeedback>
}

export default CardMini
