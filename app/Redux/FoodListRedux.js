import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  foodListRequest: ['search'],
  foodListSuccess: ['data'],
  foodListSearchResultSuccess: ['data'],
  foodListFailure: ['error'],
  initSearchResult: null
})

export const FoodListTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  data: null,
  fetching: null,
  error: null
})

/* ------------- Reducers ------------- */

// request food for a foodList
export const request = (state) => state.merge({ fetching: true })

// successful foodList lookup
export const success = (state, { data }) => {
  return state.merge({ fetching: false, error: null, data })
}

export const searchResultSuccess = (state, { data }) => {
  return state.merge({ fetching: false, error: null, searchResult: data })
}

// failed to get food
export const failure = (state, { error }) => state.merge({ fetching: false, error })

// init search
export const initSearchResult = (state, { error }) => state.merge({ fetching: false, error: null, searchResult: null })

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.FOOD_LIST_REQUEST]: request,
  [Types.FOOD_LIST_SUCCESS]: success,
  [Types.FOOD_LIST_SEARCH_RESULT_SUCCESS]: searchResultSuccess,
  [Types.INIT_SEARCH_RESULT]: initSearchResult,
  [Types.FOOD_LIST_FAILURE]: failure
})
