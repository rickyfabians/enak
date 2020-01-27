import { call, put } from 'redux-saga/effects'
import FoodDetailsActions from '../Redux/FoodDetailsRedux'

export function * getFoodDetails (api, action) {
  const { search } = action
  // make the call to the api
  const response = yield call(api.getFoodDetails, search)
  if (response.ok) {
    // do data conversion here if needed
    yield put(FoodDetailsActions.foodDetailsSuccess(response.data.meals[0]))
  } else {
    yield put(FoodDetailsActions.foodDetailsFailure('Terjadi kesalahan koneksi'))
  }
}
