import React from 'react'
import { ImageBackground, TouchableWithoutFeedback } from 'react-native'
import { View, Text } from 'react-native-animatable'
import Icon from 'react-native-vector-icons/Feather'

// Styling
import styles from './Styles/CardStyle'
import globalStyles from '../Styles/GlobalStyle'

const Card = props => {
  const { item, navigation } = props
  return <TouchableWithoutFeedback onPress={() => navigation.navigate('FoodDetails', { item })} >
    <View useNativeDriver animation='fadeInUpBig' easing='ease-out-expo' style={styles.container}>
      <ImageBackground source={{ uri: item.strMealThumb }}
        imageStyle={{ borderRadius: 10 }}
        style={[globalStyles.boxShadow, styles.backgroundImage]}>
        <View style={styles.boxBottom}>
          <Text useNativeDriver animation='fadeIn' easing='ease-out-expo' style={[globalStyles.title, globalStyles.textShadow, { color: 'white' }]}>{item.strMeal}</Text>
          <View useNativeDriver animation='fadeIn' easing='ease-out-expo' style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Icon name='heart' color='white' size={20} style={globalStyles.textShadow} />
            <Text style={[globalStyles.fontSizeMedium, globalStyles.textShadow, { paddingLeft: 4, color: 'white' }]}>{Math.floor(Math.random() * 100)}</Text>
          </View>
        </View>
      </ImageBackground>
    </View>
  </TouchableWithoutFeedback>
}

export default Card
