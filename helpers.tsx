import { AsyncStorage } from 'react-native'
import * as constant from './Utils/constant.js'
import { getStorageData, setAuthorization } from './services/provider'

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
    await AsyncStorage.clear()
  } catch (e) {
    throw new Error(e)
  }
  return { message: 'store cleared' }
}

/**
 * Used exclusively for Login purposes.
 * @param credentials
 */
export function LoginCall (credentials) {
  const endpoint = constant.LOGIN
  const method = constant.POST
  const headers = { 'Content-Type': 'application/json' }

  console.log('----- ----- ----- ----- ----- ----- ----- ----- ----- ----- ')
  console.log('Login variables ')
  console.log('endpoint : ' + endpoint)
  console.log('method : ' + method)
  console.log('headers : ' + JSON.stringify(headers))
  console.log('payload : ' + JSON.stringify(credentials))

  return new Promise((resolve, reject) => {
    fetch(endpoint, { method: method, headers: headers, body: JSON.stringify(credentials) }).then((response) => {
      if (response.status === 200) {
        return response.json()
      } else {
        console.log('stauts !== 200')
        reject(response)
      }
    }).catch(
      e => console.log({ message: 'Error Fetch', detail: e })
    ).then(
      resToReturn => { resolve(resToReturn) }
    ).catch(e => {
      console.log({ message: 'Error', detail: e })
      reject(e)
    })
  })
}

/**
 * Used exclusively for getting userLikes purposes.
 * @param credentials
 */
export const getLikes = async function (token) {
  const endpoint = constant.LIKES
  const method = constant.GET
  const headers = { Authorization: 'Bearer ' + token }

  console.log('----- ----- ----- ----- ----- ----- ----- ----- ----- ----- ')
  console.log('Call API (likes) variables ')
  console.log('endpoint : ' + endpoint)
  console.log('method : ' + method)
  console.log('headers : ' + JSON.stringify(headers))
  console.log('token : ' + token)

  return new Promise((resolve, reject) => {
    fetch(endpoint, { method: method, headers: headers }).then((response) => {
      if (response.status === 200) {
        return response.json()
      } else {
        console.log('stauts !== 200')
        console.log(JSON.stringify(response))
      }
    }).catch(
      e => console.log({ message: 'Error Fetch', detail: e })
    ).then(
      resToReturn => { resolve(resToReturn) }
    ).catch(e => {
      console.log({ message: 'Error', detail: e })
      reject(e)
    })
  })
}

/**
 * Used exclusively for retrieving the profil of the current user.
 * @param tokenParam
 * The token is nullable in the param because there's 2 possibilities :
 *    It is received when we call the function
 *    We don't received it so we need to retrieve it from localStorage
 */
export function getMyProfile (tokenParam = null) {
  const endpoint = constant.USERS + '/myProfile'
  const method = constant.GET
  if (!tokenParam) {
    this.getDataLocally('token').then(token => {
      const headers = { 'Content-Type': 'application/json', Authorization: 'Bearer ' + token }

      console.log('----- ----- ----- ----- ----- ----- ----- ----- ----- ----- ')
      console.log('MyProfile variables ')
      console.log('endpoint : ' + endpoint)
      console.log('method : ' + method)
      console.log('headers : ' + JSON.stringify(headers))

      return new Promise((resolve, reject) => {
        fetch(endpoint, { method: method, headers: headers }).then((response) => {
          if (response.status === 200) {
            return response.json()
          } else {
            console.log('stauts !== 200')
            console.log(JSON.stringify(response))
            console.log('----- ----- ----- ----- ----- ----- ----- ----- ----- ----- ')
          }
        }).catch(
          e => console.log({ message: 'Error Fetch', detail: e })
        ).then(
          resToReturn => { resolve(resToReturn) }
        ).catch(e => {
          console.log({ message: 'Error', detail: e })
          reject(e)
        })
      })
    }).catch(e => {
      console.log({ message: 'Unable to retrieve token from LocalStorage', detail: e })
    })
  }
  const token = tokenParam
  const headers = { 'Content-Type': 'application/json', Authorization: 'Bearer ' + token }

  console.log('----- ----- ----- ----- ----- ----- ----- ----- ----- ----- ')
  console.log('MyProfile variables ')
  console.log('endpoint : ' + endpoint)
  console.log('method : ' + method)
  console.log('headers : ' + JSON.stringify(headers))

  return new Promise((resolve, reject) => {
    fetch(endpoint, { method: method, headers: headers }).then((response) => {
      if (response.status === 200) {
        return response.json()
      } else {
        console.log('stauts !== 200')
        console.log(JSON.stringify(response))
        console.log('----- ----- ----- ----- ----- ----- ----- ----- ----- ----- ')
      }
    }).catch(
      e => console.log({ message: 'Error Fetch', detail: e })
    ).then(
      resToReturn => { resolve(resToReturn) }
    ).catch(e => {
      console.log({ message: 'Error', detail: e })
      reject(e)
    })
  })
}

export const getMyProfilePicture = async function (token) {
  const endpoint = constant.PROFILE_PICTURE
  const method = constant.GET
  const headers = { Authorization: 'Bearer ' + token }

  return new Promise((resolve, reject) => {
    fetch(endpoint, { method: method, headers: headers }).then((response) => {
      if (response.status === 200) {
        return response.json()
      } else {
        console.log('stauts !== 200')
        console.log(JSON.stringify(response))
        console.log('----- ----- ----- ----- ----- ----- ----- ----- ----- ----- ')
      }
    }).catch(
      e => console.log({ message: 'Error Fetch', detail: e })
    ).then(
      resToReturn => { resolve(resToReturn) }
    ).catch(e => {
      console.log({ message: 'Error', detail: e })
      reject(e)
    })
  })
}

/**
 * Used to call the api
 * @param endpoint
 * @param method
 * @deprecated params -> send instead (endpoint + param) in endpoint variable.
 * @param body
 * @param token
 */
export const requestService = async (endpoint, method, params = null, body = {}, token = null) => {
  token = await getDataLocally('token')
  token = await getStorageData()
  token = token.token
  const BaseUrl = 'https://alsatoju-dev.herokuapp.com/'
  console.log(method)
  console.log(BaseUrl + endpoint + params)
  if (token) {
    switch (method) {
      case 'GET':
        return new Promise((resolve, reject) => {
          fetch(BaseUrl + endpoint + params, {
            method: 'GET',
            headers: { Authorization: 'Bearer ' + token, 'Content-Type': 'application/json' }
          }).then((response) => {
            return response.json()
          }).then((responseJson) => {
            resolve(responseJson)
          }).catch((error) => {
            reject(error)
          })
        })
      case 'POST' || 'PATCH':
        return new Promise((resolve, reject) => {
          console.log('patch in progress')
          fetch(BaseUrl + endpoint + params, {
            method: method,
            body: JSON.stringify(body),
            headers: { Authorization: 'Bearer ' + token, 'Content-Type': 'application/json' }
          }).then(res => res.json()
          ).catch(
            (error) => { console.log(error) }
          ).then(
            (responseJson) => {
              console.log('Réponse : ')
              console.log(responseJson)
              resolve(responseJson)
            }
          ).catch((error) => {
            console.log(error)
            reject(error)
          })
        })
    }
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
