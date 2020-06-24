import { setStorageData, setAuthorization } from './services/provider'

export default function logout({ navigation }) {
    try {
      setStorageData(null).then().catch(e => { console.log('Logout setStorageData:', e) })
      setAuthorization(null)
    } catch (e) {
      console.log('Logout :', e)
    }

    return navigation.navigate('SignIn')
}