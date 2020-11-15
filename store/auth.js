// eslint-disable-next-line import/named
import { healthUserData, healthAuthToken } from '@/constants/AppTokens'
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
  const token = localStorage.getItem(healthAuthToken)
  return token !== null
    ? JSON.parse(localStorage.getItem(healthAuthToken))
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
    localStorage.setItem(healthUserData, JSON.stringify(userData))
  },

  setAccessValidity(state, bool) {
    state.accessValidity = bool
  },

  purgeAuth(state) {
    localStorage.removeItem(healthUserData)
    Cookie.remove(healthAuthToken)
    localStorage.removeItem(healthAuthToken)
    state.auth = null
    state.userData = null
  },
}

export const actions = {
  postLogin(context, payload) {
    return this.$axios
      .post(`/login`, payload)
      .then((response) => {
        context.commit('setAuth', response.data.accessToken)
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

  fetchLoggedIn(context) {
    return this.$axios
      .get(`/user/me?include=${loginQuery}`)
      .then((response) => {
        context.commit('userData', response.data.data)
        return response
      })
      .catch((error) => {
        return Promise.reject(error)
      })
  },

  logout(context) {
    context.commit('purgeAuth')
  },
}
