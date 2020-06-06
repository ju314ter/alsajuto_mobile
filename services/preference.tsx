import axios from 'axios'
import * as constant from '../Utils/constant.js'
import { handler } from './handler'

export async function patch (param, data) {
try {
  const res = await axios.patch(constant.type_preferences + '/' + param, data)
  return res.data
  } catch (e) {
    console.log('Catch PATCH type_preferences: ' + e)
    throw handler(e)
  }
}

export async function getAllTypePreference () {
  try {
    const res = await axios(constant.TYPE_PREFERENCE)
    return res.data
  } catch (e) {
    console.log('Catch GET type_preferences: ' + e)
    throw handler(e)
  }
}

export async function getAllPreference () {
  try {
    const res = await axios(constant.PREFERENCE)
    return res.data
  } catch (e) {
    console.log('Catch GET preferences: ' + e)
    throw handler(e)
  }
}
