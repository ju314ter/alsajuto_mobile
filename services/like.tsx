import axios from 'axios'
import * as constant from '../Utils/constant.js'
import { handler } from './handler'

export async function patchLike (data) {
try {
  const res = await axios.patch(constant.LIKES, data)
  return res.data
  } catch (e) {
    console.log('Catch PATCH type_preferences: ' + e)
    throw handler(e)
  }
}

export async function getAllLikes () {
  try {
    const res = await axios(constant.LIKES)
    return res.data
  } catch (e) {
    console.log('Catch GET likes: ' + e)
    throw handler(e)
  }
}
