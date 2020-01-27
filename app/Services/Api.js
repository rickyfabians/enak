// a library to wrap and simplify api calls
import apisauce from 'apisauce'
import urlConfig, { url } from '../Config/UrlConfig'
// our "constructor"
const create = (baseURL = urlConfig[url]) => {
  // ------
  // STEP 1
  // ------
  //
  // Create and configure an apisauce-based api object.
  //
  const api = apisauce.create({
    // base URL is read from the "constructor"
    baseURL,
    // here are some default headers
    headers: {
      'Cache-Control': 'no-cache'
    },
    // 10 second timeout...
    timeout: 10000
  })

  const foodApi = apisauce.create({
    // base URL is read from the "constructor"
    baseURL: urlConfig.foodUrl,
    headers: {
      'Cache-Control': 'no-cache'
    },
    // 10 second timeout...
    timeout: 10000
  })

  // if (config.DEBUG) {
  const naviMonitor = (response) => console.log('API DEBUG! response =', response)
  foodApi.addMonitor(naviMonitor)
  api.addMonitor(naviMonitor)
  // }

  // ------
  // STEP 2
  // ------
  //
  // Define some functions that call the api.  The goal is to provide
  // a thin wrapper of the api layer providing nicer feeling functions
  // rather than "get", "post" and friends.
  //
  // I generally don't like wrapping the output at this level because
  // sometimes specific actions need to be take on `403` or `401`, etc.
  //
  // Since we can't hide from that, we embrace it by getting out of the
  // way at this level.
  //

  const getFoodList = (search = 'beef') => {
    return foodApi.get(`/search.php?s=${search}`)
  }

  const getFoodDetails = (search = 'beef') => {
    return foodApi.get(`/lookup.php?i=${search}`)
  }

  // ------
  // STEP 3
  // ------
  //
  // Return back a collection of functions that we would consider our
  // interface.  Most of the time it'll be just the list of all the
  // methods in step 2.
  //
  // Notice we're not returning back the `api` created in step 1?  That's
  // because it is scoped privately.  This is one way to create truly
  // private scoped goodies in JavaScript.
  //
  return {
    // a list of the API functions from step 2
    getFoodList,
    getFoodDetails
  }
}

// let's return back our create method as the default.
export default {
  create
}
