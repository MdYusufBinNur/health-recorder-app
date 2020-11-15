// eslint-disable-next-line import/named
export const state = () => {}

export const getters = {}

export const mutations = {}

export const actions = {
  saveAppointment(context, payload) {
    return this.$axios
      .post(`/appointments`, payload)
      .then((response) => {
        return response
      })
      .catch((error) => {
        return Promise.reject(error)
      })
  },
  getAppointmentList(context, payload) {
    return this.$axios
      .get('/appointment/' + payload)
      .then((response) => {
        return response
      })
      .catch((error) => {
        return error.message
      })
  },
}
