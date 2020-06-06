export const API_URL = process.env.API_URL || 'https://alsatoju-dev.herokuapp.com'
//export const API_URL = 'http://localhost:3000'

// Keyword
export const TOKEN = 'token'
export const GET = 'GET'
export const POST = 'POST'
export const PATCH = 'PATCH'
export const DELETE = 'DELETE'

// Road
export const LOGIN = `${API_URL}/login`
export const MATCHS = `${API_URL}/matchings`
export const REFRESH = `${API_URL}/matchings/refresh`
export const GAMES = `${API_URL}/games`
export const USERS = `${API_URL}/app_users`
export const MY_PROFIL = `${USERS}/myProfile`
export const LIKES = `${API_URL}/likes`
export const PROFIL_PICTURE = `${API_URL}/my_profil_picture`
export const TYPE_PREFERENCE = `${API_URL}/type_preferences`
export const PREFERENCE = `${API_URL}/preferences`
