<template>
  <v-container>
    <h1 class="black--text text-uppercase text-center mb-2">
      About This Hospital
    </h1>
    <v-row>
      <v-col cols="12" sm="4">
        <v-card max-width="344" outlined flat light>
          <v-img :src="hospital.image" height="170px"></v-img>
          <v-list-item class="px-2">
            <v-list-item-content>
              <v-list-item-title class="font-weight-bold pl-1">
                {{ hospital.name }}
              </v-list-item-title>
              <p class="expert_title pl-1">{{ hospital.address }}</p>
              <p class="expert_title pl-1">{{ hospital.contact }}</p>
              <v-rating
                v-model="hospital.rating"
                small
                dense
                readonly
                half-increments
                background-color="orange lighten-3"
                color="orange"
              ></v-rating>
            </v-list-item-content>
          </v-list-item>
        </v-card>
        <v-card flat light outlined class="mt-5" max-width="344">
          <h3 class="pa-1">About {{ hospital.name }}</h3>
          <v-divider />
          <p style="font-size: 13px" class="pa-1">{{ hospital.details }}</p>
        </v-card>
      </v-col>
      <v-col cols="12" sm="8" class="pa-0">
        <Doctors ref="doctor_details" :hospital="hospital" :details="true" />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import dc1 from '@/static/dc1.jpg'
import dc2 from '@/static/dc2.jpg'
import dc3 from '@/static/dc3.jpg'
import dc4 from '@/static/dc4.jpg'
import cmch from '@/static/hospitals/cmch.jpg'
import dmc from '@/static/hospitals/dmc.jpg'
import chvr from '@/static/hospitals/cvrh.jpg'
import applo from '@/static/hospitals/applo.jpg'
import beh from '@/static/hospitals/beh.jpg'
import Doctors from '../../components/Doctors/Doctors'
export default {
  name: 'Details',
  components: { Doctors },
  data() {
    return {
      hospital: {},
    }
  },
  inject: {
    theme: {
      default: { isDark: false },
    },
  },
  created() {
    this.getHospitalDetails()
  },
  methods: {
    getHospitalDetails() {
      try {
        this.$axios
          .get('/hospital/' + this.$route.params.id)
          .then((response) => {
            this.hospital = response.data
            this.loading = false
          })
          .catch((error) => {
            console.error(error.message)
          })
      } catch (e) {}
    },
  },
}
</script>

<style scoped></style>
