import { takeLatest, all } from 'redux-saga/effects'
import API from '../Services/Api'
// import DebugConfig from '../Config/DebugConfig'

/* ------------- Types ------------- */

import { FoodListTypes } from '../Redux/FoodListRedux'
import { FoodDetailsTypes } from '../Redux/FoodDetailsRedux'
import { BookmarkTypes } from '../Redux/BookmarkRedux'

/* ------------- Sagas ------------- */
import { getFoodList } from './FoodListSagas'
import { getFoodDetails } from './FoodDetailsSagas'
import { setBookmark } from './BookmarkSagas'

/* ------------- API ------------- */

// The API we use is only used from Sagas, so we create it here and pass along
// to the sagas which need it.
const api = API.create()

/* ------------- Connect Types To Sagas ------------- */

export default function * root () {
  yield all([
    // some sagas only receive an action
    takeLatest(FoodListTypes.FOOD_LIST_REQUEST, getFoodList, api),
    takeLatest(FoodDetailsTypes.FOOD_DETAILS_REQUEST, getFoodDetails, api),
    takeLatest(BookmarkTypes.BOOKMARK_REQUEST, setBookmark)
  ])
}
