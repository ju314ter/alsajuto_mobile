import AsyncStorage from '@react-native-community/async-storage';

export const storeDataLocally =  async (storage_key: string, valueToStore: string) => {
    try {
      await AsyncStorage.setItem('@' + storage_key, valueToStore)
    } catch (e) {
      alert('Couldn\'nt store value to local store');
      throw new Error(e);
    }
  }

export const getDataLocally = async (storage_key: string) => {
    try {
      const value = await AsyncStorage.getItem('@' + storage_key)
      if(value !== null) {
          if(storage_key == 'userAccountToken') {
            console.log("token number : ", value);
          }
        // value previously stored
      }
    } catch(e) {
      // error reading value
      throw new Error(e);
    }
  }