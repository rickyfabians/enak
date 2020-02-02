import React, { Component } from 'react'
import { View, Text } from 'react-native-animatable'
import { FlatList } from 'react-native'
import _ from 'lodash'
import LottieView from 'lottie-react-native'
import { connect } from 'react-redux'
// import Icon from 'react-native-vector-icons/MaterialIcons'

// Redux
import BookmarkActions from '../Redux/BookmarkRedux'

// Component
import CardMini from '../Components/CardMini'

// style
import globalStyles from '../Styles/GlobalStyle'

export class Bookmark extends Component {
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
    const { bookmarkRequest, bookmark, navigation } = this.props
    const { keyword } = this.state
    return (
      <View style={{ paddingTop: 20, flex: 1, backgroundColor: 'white' }}>
        <View style={{ flexDirection: 'row', alignItems: 'center', paddingHorizontal: 5, paddingBottom: 10 }} />
        {bookmark.fetching
          ? <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <LottieView source={require('../Assets/loading.json')} autoPlay loop style={globalStyles.loadingAnimation} />
          </View>
          : <FlatList
            data={bookmark.data}
            onRefresh={() => bookmarkRequest(keyword)}
            refreshing={false}
            numColumns={2}
            ListEmptyComponent={() => _.isArray(bookmark.data) &&
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
  bookmark: state.bookmark
})

const mapDispatchToProps = (dispatch) => ({
  bookmarkRequest: (search) => dispatch(BookmarkActions.bookmarkRequest(search)),
  initSearchResult: () => dispatch(BookmarkActions.initSearchResult())
})

export default connect(mapStateToProps, mapDispatchToProps)(Bookmark)
