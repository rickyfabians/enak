import React, { Component } from 'react'
import { Text, ScrollView, StatusBar, Dimensions } from 'react-native'
import { View, Image } from 'react-native-animatable'
import { WebView } from 'react-native-webview'
import { connect } from 'react-redux'
// import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import _ from 'lodash'

import styles from './Styles/FoodDetailsStyles'
import globalStyles from '../Styles/GlobalStyle'

// Redux
import FoodDetailsActions from '../Redux/FoodDetailsRedux'

const { height, width } = Dimensions.get('screen')
export class FoodDetails extends Component {
  constructor (props) {
    super(props)
    this.state = {
      data: props.navigation.getParam('item', null),
      size: 0,
      ingredient: [],
      measure: []
    }
  }

  componentDidMount () {
    const { data } = this.state
    this.props.foodDetailsRequest(this.state.data.idMeal)
    const ingredient = _.reduce(data, (result, value, key) => {
      if (key.includes('strIngredient') && value) result.push(value)
      return result
    }, [])
    const measure = _.reduce(data, (result, value, key) => {
      if (key.includes('strMeasure') && value) result.push(value)
      return result
    }, [])
    this.setState({ ingredient, measure })
  }

  handleScroll (event) {
    let y = event.nativeEvent.contentOffset.y
    if (y < 150) this.setState({ size: y / 2000 })
  }

  render () {
    const { data, size, ingredient, measure } = this.state
    // const { foodDetails } = this.props
    return (
      <View>
        <StatusBar translucent backgroundColor='transparent' barStyle='dark-content' />
        {/* <TouchableWithoutFeedback onPress={() => navigation.goBack()} >
            <View useNativeDriver animation='slideInLeft' easing='ease-in-out-quad' style={{position:'absolute', paddingTop: 25, paddingLeft:5, zIndex:1}}>
              <Icon name={'arrow-left'} size={35} />
            </View>
          </TouchableWithoutFeedback> */}
        {data &&
        <ScrollView onScroll={(v) => this.handleScroll(v)}>

          <View style={{ width, height: height * 0.7, overflow: 'hidden' }}>
            <Image useNativeDriver animation='zoomIn' easing='ease-out-expo' source={{ uri: data.strMealThumb }} style={{ width: width + size, height: height * (0.65 + size) }} />
          </View>
          <View useNativeDriver animation='slideOutUp' easing='ease-out-expo' style={styles.boxBottom}>
            <Text style={globalStyles.title}>{data.strMeal}</Text>
            <Text style={[globalStyles.fontMedium, { fontWeight: 'bold', paddingTop: 15, paddingBottom: 5 }]}>{'Instructions'}</Text>
            <Text style={globalStyles.fontMedium}>{data.strInstructions}</Text>
            <View style={{ marginVertical: 20, width: width * 0.95, height: width * 0.55, alignSelf: 'center', borderRadius: 5, overflow: 'hidden' }}>
              <WebView source={{ uri: `https://www.youtube.com/embed/${data.strYoutube.split('watch?v=')[1]}` }} javaScriptEnabled domStorageEnabled mediaPlaybackRequiresUserAction />
            </View>
            <View>
              <Text style={[globalStyles.fontMedium, { fontWeight: 'bold', paddingTop: 10, paddingBottom: 2 }]}>{'Ingradient'}</Text>
              {_.map(ingredient, (value, index) => (
                <View style={{ justifyContent: 'space-between', flexDirection: 'row', borderBottomWidth: 1, paddingTop: 6 }}>
                  <Text key={index} style={globalStyles.fontMedium}>{value}</Text>
                  <Text key={index} style={globalStyles.fontMedium}>{measure[index] || ''}</Text>
                </View>
              ))}
            </View>

          </View>
        </ScrollView>
        }
      </View>
    )
  }
}

const mapStateToProps = (state) => ({
  foodDetails: state.foodDetails
})

const mapDispatchToProps = (dispatch) => ({
  foodDetailsRequest: (search) => dispatch(FoodDetailsActions.foodDetailsRequest(search))
})

export default connect(mapStateToProps, mapDispatchToProps)(FoodDetails)
