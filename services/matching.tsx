import axios from 'axios'
import * as constant from '../Utils/constant.js'
import { handler } from './handler'

export async function matchings () {
  try {
    const res = await axios.get(constant.REFRESH)
    console.log(res.data)
    return res.data
  } catch (e) {
    console.log('Catch matching(): ' + e)
    throw handler(e)
  }
}

export async function matchs() {
  try {
    const res = await axios.get(constant.MATCHS)
    console.log(res.data)
    return res.data
  }
  catch(e) {
    console.log('Catch matchs(): ' + e)
    throw handler(e)
  }
}

export async function patchMatch (idToPatch, data, token = null) {
  try {
    const res = await axios.patch(constant.MATCHS + '/' + idToPatch, data)
    console.log('Patch :')
    console.log(res.data)
    return res.data
  } catch (e) {
    console.log('Catch Patch User: ' + e)
    throw handler(e)
  }
}

