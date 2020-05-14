import { AsyncStorage } from 'react-native'

/**
 * used to store locally some data
 * @param storageKey
 * @param valueToStore
 */
export const storeDataLocally = async (storageKey, valueToStore) => {
  try {
    await AsyncStorage.setItem('@' + storageKey, valueToStore)
  } catch (e) {
    // change alert message to no display to much informations in front.
    alert('Oops something went wrong')
    // We logged the error not throw it to the user.
    console.log(e)
    // throw new Error(e)
  }
}

/**
 * used to retrieve data stored locally
 * @param storageKey
 */
export const getDataLocally = async (storageKey) => {
  let value = null
  try {
    value = await AsyncStorage.getItem('@' + storageKey) || null
  } catch (e) {
    throw new Error(e)
  }
  return value
}

/**
 * used to clear local data
 */
export const clearLocalData = async () => {
  try {
    await AsyncStorage.clear();
  } catch (e) {
    throw new Error(e);
  }
  return { message: 'store cleared' };
}

/** 
 * Used to call the api
 * @param endpoint
 * @param method
 * @deprecated params -> send instead (endpoint + param) in endpoint variable.
 * @param body
 * @param token
 */
  const BaseUrl = 'https://alsatoju-dev.herokuapp.com/'
  token = await getDataLocally('token')
export const requestService = async (endpoint, method, params = null, body = {}, token = null) => {
  if (token) {
    if (method === 'GET') {
      return new Promise((resolve, reject) => {
        fetch(BaseUrl + endpoint, {
          method: 'GET',
          headers: {
            Authorization: 'Bearer ' + token,
            'Content-Type': 'application/json'
          }
        }).then((response) => {
          return response.json()
        }).then((responseJson) => {
          resolve(responseJson)
        }).catch((error) => {
          reject(error)
        })
      })
    }
    return new Promise((resolve, reject) => {
      fetch(BaseUrl + endpoint + params, {
        method: method,
        body: JSON.stringify(body),
        headers: {
          Authorization: 'Bearer ' + token,
          'Content-Type': 'application/json'
        }
      }).then((response) => {
        return response.json()
      }).then((responseJson) => {
        resolve(responseJson)
      }).catch((error) => {
        reject(error)
      })
    })
  } else {
    return new Promise((resolve, reject) => {
      fetch(BaseUrl + endpoint, {
        method: method,
        body: JSON.stringify(body),
        headers: {
          'Content-Type': 'application/json'
        }
      }).then((response) => {
        return response.json()
      }).then((responseJson) => {
        resolve(responseJson)
      }).catch((error) => {
        reject(error)
      })
    })
  }
}
