import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  foodDetailsRequest: ['search'],
  foodDetailsSuccess: ['data'],
  foodDetailsSearchResultSuccess: ['data'],
  foodDetailsFailure: null
})

export const FoodDetailsTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  data: null,
  fetching: null,
  error: null
})

/* ------------- Reducers ------------- */

// request food for a foodDetails
export const request = (state) => state.merge({ fetching: true })

// successful foodDetails lookup
export const success = (state, { data }) => {
  return state.merge({ fetching: false, error: null, data })
}

// failed to get food
export const failure = (state, { error }) => state.merge({ fetching: false, error })

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.FOOD_DETAILS_REQUEST]: request,
  [Types.FOOD_DETAILS_SUCCESS]: success,
  [Types.FOOD_DETAILS_FAILURE]: failure
})
