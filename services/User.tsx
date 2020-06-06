import axios from 'axios'
import * as constant from '../Utils/constant.js'
import { handler } from './handler'

export async function login (data) {
  try {
    if (axios.defaults.headers.common["Authorization"]) { delete axios.defaults.headers.common["Authorization"] }
    const res = await axios.post(constant.LOGIN, data)
    axios.defaults.headers.common["Authorization"] = `Bearer ${res.data.token}`
    return res.data
  } catch (e) {
    console.log('Catch login() :' + e)
    throw handler(e)
  }
}

export async function patch (param, data) {
  try {
    const res = await axios.patch(constant.USERS + '/' + param, data)
    return res.data
  } catch (e) {
    console.log('Catch Patch User: ' + e)
    throw handler(e)
  }
}

export async function getMe() {
  try {
    const res = await axios.get(constant.MY_PROFIL)
    console.log('getMe :')
    console.log(res.data)
    return res.data
  } catch (e) {
    console.log('Catch getMe() User: ' + e)
    throw handler(e)
  }
}

export async function getMyProfilPicture() {
  try {
    const res = await axios.get(constant.PROFIL_PICTURE)
    if (res.data) return res.data
    else return null
  } catch (e) {
    console.log('catch GetMyProfilPicture : ', e)
    throw handler(e)
  }
}
