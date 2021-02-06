// eslint-disable-next-line import/named
import { healthUserToken, healthAuthToken } from '../constants/AppTokens'
const Cookie = process.client ? require('js-cookie') : undefined
const loginQuery = ''

function getAuthToken() {
  return Cookie
    ? Cookie.get(healthAuthToken)
      ? Cookie.get(healthAuthToken)
      : null
    : null
}

function getUserData() {
  return localStorage.getItem(healthUserToken)
    ? JSON.parse(localStorage.getItem(healthUserToken))
    : null
}

export const state = () => {
  return {
    auth: getAuthToken(),
    userData: getUserData(),
    accessValidity: true,
  }
}

export const getters = {
  userData(state) {
    return state.userData
  },

  auth(state) {
    return state.auth
  },

  accessValidity(state) {
    return state.accessValidity
  },
}

export const mutations = {
  setAuth(state, auth) {
    state.auth = auth
    Cookie.set(healthAuthToken, auth) // saving token in cookie for server rendering
    localStorage.setItem(healthAuthToken, auth)
  },

  userData(state, userData) {
    state.userData = userData
    localStorage.setItem(healthUserToken, JSON.stringify(userData))
  },

  setAccessValidity(state, bool) {
    state.accessValidity = bool
  },

  purgeAuth(state) {
    localStorage.removeItem(healthUserToken)
    Cookie.remove(healthAuthToken)
    localStorage.removeItem(healthAuthToken)
    state.auth = null
    state.userData = null
  },
}

export const actions = {
  postLogin(context, payload) {
    return this.$axios
      .post(`/login?include=${loginQuery}`, payload)
      .then((response) => {
        context.commit('setAuth', response.data.access_token)
        context.commit('userData', response.data.user)
        return response
      })
      .catch((error) => {
        return Promise.reject(error)
      })
  },

  register(context, payload) {
    return this.$axios
      .post('/register' , payload)
      .then((response) => {
        context.commit('setAuth', response.data.access_token)
        context.commit('userData', response.data.user)
        return response
      })
      .catch((error) => {
        return Promise.reject(error)
      })
  },
  saveUserData(context, payload) {
    const id = payload.id
    delete payload.id
    return this.$axios
      .put('/user/' + id, payload)
      .then((response) => {
        const userData = response.data.data
        // console.log('save user:', userData)
        context.commit('userData', userData)
        return response
      })
      .catch((error) => {
        // console.log("error:", JSON.stringify(error.response.data))
        // return error.response.data
        return Promise.reject(error)
      })
  },

  setAccessValidity(context, payload) {
    return context.commit('setAccessValidity', payload)
  },

  logout(context) {
    context.commit('purgeAuth')
  },
}
