import React, { Component } from 'react'
import { View, Text } from 'react-native-animatable'
import { FlatList, TextInput, TouchableWithoutFeedback } from 'react-native'
import _ from 'lodash'
import LottieView from 'lottie-react-native'
import { connect } from 'react-redux'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'

// Redux
import FoodListActions from '../Redux/FoodListRedux'

// Component
import CardMini from '../Components/CardMini'

// style
import globalStyles from '../Styles/GlobalStyle'

export class Search extends Component {
  constructor (props) {
    super(props)
    this.state = {
      keyword: ''
    }
  }

  componentWillUnmount () {
    this.props.initSearchResult()
  }

  render () {
    const { foodListRequest, food, navigation } = this.props
    const { keyword } = this.state
    return (
      <View style={{ paddingTop: 20, flex: 1, backgroundColor: 'white' }}>
        <View style={{ flexDirection: 'row', alignItems: 'center', paddingHorizontal: 5, paddingBottom: 10 }}>
          <TouchableWithoutFeedback onPress={() => navigation.goBack()} >
            <View useNativeDriver animation='slideInLeft' easing='ease-in-out-quad'>
              <Icon name={'arrow-left'} size={30} color={'orange'} />
            </View>
          </TouchableWithoutFeedback>
          <View useNativeDriver animation='slideInLeft' easing='ease-out-expo' style={{ flex: 1, borderWidth: 1, borderColor: 'orange', borderRadius: 20, paddingHorizontal: 8 }} >
            <TextInput
              style={{ height: 40, fontWeight: 'bold' }}
              onChangeText={v => this.setState({ keyword: v })}
              autoFocus
              placeholder={'Seafood..'}
              placeholderTextColor={'orange'}
              value={keyword}
              onSubmitEditing={() => foodListRequest(keyword)}
            />
          </View>
        </View>
        {food.fetching
          ? <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <LottieView source={require('../Assets/loading.json')} autoPlay loop style={globalStyles.loadingAnimation} />
          </View>
          : <FlatList
            data={food.searchResult}
            onRefresh={() => foodListRequest(keyword)}
            refreshing={false}
            numColumns={2}
            ListEmptyComponent={() => _.isArray(food.searchResult) &&
                (
                  <View style={{ justifyContent: 'center', alignItems: 'center', paddingTop: 50 }}>
                    <LottieView source={require('../Assets/notFound.json')} autoPlay loop style={globalStyles.notFoundAnimation} />
                    <Text style={{ width: '60%', textAlign: 'center', fontWeight: 'bold' }}>We can't find any food that match with the keyword</Text>
                  </View>
                )
            }
            style={{ flex: 1 }}
            keyExtractor={(item, index) => `searchResult flatlist ${index}`}
            renderItem={({ item }) => <CardMini item={item} grid navigation={navigation} />}
          />
        }
      </View>
    )
  }
}

const mapStateToProps = (state) => ({
  food: state.foodList
})

const mapDispatchToProps = (dispatch) => ({
  foodListRequest: (search) => dispatch(FoodListActions.foodListRequest(search)),
  initSearchResult: () => dispatch(FoodListActions.initSearchResult())
})

export default connect(mapStateToProps, mapDispatchToProps)(Search)
