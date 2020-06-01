import axios from 'axios'
import * as constant from '../Utils/constant.js'
import { handler } from './handler'

export async function login (data) {
  try {
    const res = await axios.post(constant.LOGIN, data)
    console.log(res.data)
    return res.data
  } catch (e) {
    console.log('Catch login(): ' + e)
    throw handler(e)
  }
}
export const setAuthorization = (token) => {
  // Apply authorization token to every request if logged in
  if (!token) delete axios.defaults.headers.common["Authorization"]
  else axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
}

export async function patch (param, data, token) {
  setAuthorization(token)
  console.log(constant.USERS + '/' + param)
  console.log(token)
  try {
    const res = await axios.patch(constant.USERS + '/' + param, data)
    return res.data
  } catch (e) {
    console.log('Catch Patch User: ' + e)
    throw handler(e)
  }
}
