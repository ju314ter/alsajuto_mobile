import axios from 'axios'
import * as constant from '../Utils/constant.js'
import { handler } from './handler'

export async function matchings () {
  try {
    const res = await axios.get(constant.REFRESH)
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

export async function patch (param, data, token = null) {

  try {
    const res = await axios.patch(constant.MATCHS + '/' + param, data)
    console.log('Patch :')
    console.log(res.data)
    return res.data
  } catch (e) {
    console.log('Catch Patch User: ' + e)
    throw handler(e)
  }
}

