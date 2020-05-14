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
  let value: string = null;
  try {
    value = await AsyncStorage.getItem('@' + storage_key) || null;
  } catch (e) {
    throw new Error(e);
  }
  return value;
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
 */
export const requestService = async (endpoint: string, method: string, params?: string, body = {}, token?: string) => {
  token = await getDataLocally('token');
  console.log(endpoint, method)
  let BaseUrl = 'https://alsatoju-dev.herokuapp.com/'
  if (token) {
    if (method === 'GET') {
      return new Promise((resolve, reject) => {
        fetch(BaseUrl + endpoint, {
          method: 'GET',
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
    }
    return new Promise((resolve, reject) => {
      fetch(BaseUrl + endpoint + params, {
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
        return response.json();
      }).then((responseJson) => {
        resolve(responseJson)
      }).catch((error) => {
        reject(error)
      })
    })
  }
}
