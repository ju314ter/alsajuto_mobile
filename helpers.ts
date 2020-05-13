import { AsyncStorage } from 'react-native';

/**
 * used to store locally some data
 * @param storage_key 
 * @param valueToStore 
 */
export const storeDataLocally = async (storage_key: string, valueToStore: string) => {
  try {
    await AsyncStorage.setItem('@' + storage_key, valueToStore)
  } catch (e) {
    alert('Couldn\'nt store value to local store');
    throw new Error(e);
  }
}

/**
 * used to retrieve data stored locally
 * @param storage_key 
 */
export const getDataLocally = async (storage_key: string) => {
    let value = null;
  try {
    value = await AsyncStorage.getItem('@' + storage_key) || null;
  } catch (e) {
    throw new Error(e);
  }
  return value;
}

/** 
 * Used to call the api
 */
export function requestService(endpoint: string, method: string, body = {}, token = getDataLocally('userAccountToken')) {
  let BaseUrl = 'https://alsatoju-dev.herokuapp.com/'
  if (token) {
    return new Promise((resolve, reject) => {
      fetch(BaseUrl + endpoint, {
        method: method,
        body: JSON.stringify(body),
        headers: {
          Authorization: "Bearer " + token,
          'Content-Type': 'application/json',
        },
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
          'Content-Type': 'application/json',
        },
      }).then((response) => {
        console.log('-----------response-------------')
          console.log(response)
        return response.json();
      }).then((responseJson) => {
        resolve(responseJson)
      }).catch((error) => {
        reject(error)
      })
    })
  }
}
