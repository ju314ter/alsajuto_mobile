import axios from 'axios'
import * as constant from '../Utils/constant.js'
import { handler } from './handler'

export async function login (data) {
  console.log(constant.LOGIN)
  try {
    const res = await axios.post(constant.LOGIN, data)
    console.log('### LOGIN ###')
    console.log(res.data)
    console.log('### END LOGIN ###')
    return res.data
  } catch (e) {
    console.log('Catch login(): ' + e)
    throw handler(e)
  }
}

export async function patch (param, data) {
  try {
    const res = await axios.patch(constant.USERS + '/' + param, data)
    console.log('Patch :')
    console.log(res.data)
    return res.data
  } catch (e) {
    console.log('Catch Patch User: ' + e)
    throw handler(e)
  }
}

export async function getMe(token = false) {
  try {
    if (token) {
      setAuthorization(token)
    }
    const res = await axios.get(constant.MY_PROFIL)
    console.log('getMe :')
    console.log(res.data)
    return res.data
  } catch (e) {
    console.log('Catch getMe() User: ' + e)
    throw handler(e)
  }
}
