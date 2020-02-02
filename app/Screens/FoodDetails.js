import React, { Component } from 'react'
import { Text, ScrollView, Dimensions, TouchableOpacity, ActivityIndicator, TouchableWithoutFeedback } from 'react-native'
import { View, Image } from 'react-native-animatable'
import { WebView } from 'react-native-webview'
import { connect } from 'react-redux'
import Icon from 'react-native-vector-icons/MaterialIcons'
import _ from 'lodash'

import styles from './Styles/FoodDetailsStyles'
import globalStyles from '../Styles/GlobalStyle'

// Redux
import BookmarkActions from '../Redux/BookmarkRedux'

const { height, width } = Dimensions.get('screen')
export class FoodDetails extends Component {
  constructor (props) {
    super(props)
    this.state = {
      data: props.navigation.getParam('item', null),
      size: 0,
      ingredient: [],
      measure: [],
      fetchingBookmark: true
    }
  }

  componentDidMount () {
    const { bookmark } = this.props
    const { data } = this.state
    let bookmarkText = 'Add to bookmark'
    if (_.includes(bookmark.data, data)) {
      bookmarkText = ''
    }
    const ingredient = _.reduce(data, (result, value, key) => {
      if (key.includes('strIngredient') && value) result.push(value)
      return result
    }, [])
    const measure = _.reduce(data, (result, value, key) => {
      if (key.includes('strMeasure') && value) result.push(value)
      return result
    }, [])
    this.setState({ ingredient, measure, bookmarkText, fetchingBookmark: false })
  }

  componentDidUpdate (prevProps) {
    const { bookmark } = this.props
    if (this.state.fetchingBookmark && prevProps.bookmark.data !== bookmark.data) {
      setTimeout(() => {
        this.setState({ fetchingBookmark: false })
      }, 2000)
    }
  }

  handleScroll (event) {
    let y = event.nativeEvent.contentOffset.y
    if (y < 150) this.setState({ size: y / 2000 })
  }

  render () {
    const { data, size, ingredient, measure, fetchingBookmark, bookmarkText } = this.state
    const { bookmarkRequest } = this.props
    return (
      <View>
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
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
              <Text style={[globalStyles.title, { flex: 1 }]}>{data.strMeal}</Text>
              <TouchableOpacity onPress={() => this.props.navigation.goBack()} >
                <Icon name={'keyboard-arrow-down'} size={35} color={'#16a085'} />
              </TouchableOpacity>
            </View>
            <Text style={[globalStyles.fontMedium, { fontWeight: 'bold', paddingTop: 15, paddingBottom: 5 }]}>{'Instructions'}</Text>
            <Text style={globalStyles.fontMedium}>{data.strInstructions}</Text>
            <View style={{ marginVertical: 20, width: width * 0.95, height: width * 0.55, alignSelf: 'center', borderRadius: 5, overflow: 'hidden' }}>
              <WebView source={{ uri: `https://www.youtube.com/embed/${data.strYoutube.split('watch?v=')[1]}` }} javaScriptEnabled domStorageEnabled mediaPlaybackRequiresUserAction />
            </View>
            <View>
              <Text style={[globalStyles.fontMedium, { fontWeight: 'bold', paddingTop: 10, paddingBottom: 2 }]}>{'Ingradient'}</Text>
              {_.map(ingredient, (value, index) => (
                <View key={`new ${index}`} style={{ justifyContent: 'space-between', flexDirection: 'row', borderBottomWidth: 1, paddingTop: 6 }}>
                  <Text style={globalStyles.fontMedium}>{value}</Text>
                  <Text style={[globalStyles.fontMedium, { fontWeight: 'bold' }]}>{measure[index] || ''}</Text>
                </View>
              ))}
            </View>

          </View>
        </ScrollView>
        }
        {fetchingBookmark &&
          <View useNativeDriver animation='flipInY' easing='ease-out-expo'style={{ alignItems: 'center', justifyContent: 'center', paddingVertical: 10, paddingHorizontal: 20, borderRadius: 30, backgroundColor: '#16a085', position: 'absolute', bottom: 10, alignSelf: 'center' }}>
            <ActivityIndicator color='white' />
          </View>
        }
        {!_.isEmpty(bookmarkText) &&
          <TouchableWithoutFeedback onPress={() => {
            this.view.flipOutY(1000)
            this.setState({ fetchingBookmark: true }, () => bookmarkRequest(data))
          }
          }>
            <View ref={ref => (this.view = ref)} style={{ alignItems: 'center', justifyContent: 'center', paddingVertical: 10, paddingHorizontal: 20, borderRadius: 30, backgroundColor: '#16a085', position: 'absolute', bottom: 10, alignSelf: 'center' }}>
              <Text style={{ color: 'white' }}>{bookmarkText}</Text>
            </View>
          </TouchableWithoutFeedback>
        }
      </View>
    )
  }
}

const mapStateToProps = (state) => ({
  bookmark: state.bookmark
})

const mapDispatchToProps = (dispatch) => ({
  bookmarkRequest: (data) => dispatch(BookmarkActions.bookmarkRequest(data))
})

export default connect(mapStateToProps, mapDispatchToProps)(FoodDetails)
