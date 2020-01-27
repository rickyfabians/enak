import { call, put } from 'redux-saga/effects'
import FoodListActions from '../Redux/FoodListRedux'

export function * getFoodList (api, action) {
  const { search } = action
  // make the call to the api
  const response = yield call(api.getFoodList, search)
  if (response.ok) {
    // do data conversion here if needed
    if (search) yield put(FoodListActions.foodListSearchResultSuccess(response.data.meals || []))
    else yield put(FoodListActions.foodListSuccess(response.data.meals))
  } else {
    yield put(FoodListActions.foodListFailure('Terjadi kesalahan koneksi'))
  }
}
