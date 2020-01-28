import React, { Component } from 'react'
import { FlatList, ScrollView, RefreshControl } from 'react-native'
import { View, Text } from 'react-native-animatable'
import { connect } from 'react-redux'
import LottieView from 'lottie-react-native'
import _ from 'lodash'

// Redux
import FoodListActions from '../Redux/FoodListRedux'

// Components
import Header from '../Components/Header'
import Card from '../Components/Card'
import CardMini from '../Components/CardMini'

// Style
import globalStyles from '../Styles/GlobalStyle'

export class Home extends Component {
  componentDidMount () {
    this.props.foodListRequest()
  }

  renderBody () {
    const { foodListRequest, navigation, food } = this.props
    return (
      <ScrollView
        refreshControl={<RefreshControl refreshing={false} onRefresh={foodListRequest.bind(this)} />}
      >
        <Card item={_.sample(food.data)} navigation={navigation} />
        <View useNativeDriver animation='fadeInUpBig' easing='ease-out-expo'>
          <View style={{ alignItems: 'center', justifyContent: 'space-between', flexDirection: 'row', paddingHorizontal: 10, paddingTop: 15 }}>
            <Text style={{ color: '#16a085', fontSize: 20, fontWeight: '800' }}>Trending</Text>
          </View>
          <FlatList
            data={_.sampleSize(food.data, 6)}
            horizontal
            // style={{ paddingHorizontal: 10 }}
            keyExtractor={(item, index) => `food flatlist ${index}`}
            renderItem={({ item }) => <CardMini item={item} navigation={navigation} />}
          />
        </View>
        <View useNativeDriver animation='fadeInUpBig' easing='ease-out-expo'>
          <View style={{ alignItems: 'center', justifyContent: 'space-between', flexDirection: 'row', paddingHorizontal: 10, paddingTop: 15 }}>
            <Text style={{ color: '#16a085', fontSize: 20, fontWeight: '800' }}>Rekomendasi</Text>
          </View>
          <FlatList
            data={_.sampleSize(food.data, 5)}
            horizontal
            // style={{ paddingHorizontal: 10 }}
            keyExtractor={(item, index) => `food flatlist ${index}`}
            renderItem={({ item }) => <CardMini item={item} navigation={navigation} />}
          />
        </View>
        <View useNativeDriver animation='fadeInUpBig' easing='ease-out-expo'>
          <View style={{ alignItems: 'center', justifyContent: 'space-between', flexDirection: 'row', paddingHorizontal: 10, paddingTop: 15 }}>
            <Text style={{ color: '#16a085', fontSize: 20, fontWeight: '800' }}>Recent</Text>
          </View>
          <FlatList
            numColumns={2}
            data={food.data}
            style={{ flex: 1 }}
            keyExtractor={(item, index) => `food flatlist ${index}`}
            renderItem={({ item }) => <CardMini item={item} grid navigation={navigation} />}
          />
        </View>
      </ScrollView>
    )
  }

  render () {
    const { navigation, food } = this.props
    return (
      <View style={{ paddingTop: 20, flex: 1, backgroundColor: 'white' }}>
        <Header navigation={navigation} />
        {food.fetching
          ? <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', overflow: 'hidden' }}>
            <LottieView source={require('../Assets/loading.json')} autoPlay style={globalStyles.loadingAnimation} />
          </View>
          : (food.data && food.data.length > 0)
            ? this.renderBody()
            : <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
              <LottieView source={require('../Assets/notFound.json')} autoPlay loop style={globalStyles.notFoundAnimation} />
              <Text>Makanan tidak ditemukan</Text>
            </View>
        }
      </View>
    )
  }
}

const mapStateToProps = (state) => ({
  food: state.foodList
})

const mapDispatchToProps = (dispatch) => ({
  foodListRequest: (search) => dispatch(FoodListActions.foodListRequest(search))
})

export default connect(mapStateToProps, mapDispatchToProps)(Home)
