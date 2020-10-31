<template>
  <v-container>
    <h1 class="black--text text-uppercase text-center mb-2">
      About This Hospital
    </h1>
    <v-row>
      <v-col cols="12" sm="4">
        <v-card max-width="344" outlined flat light>
          <v-img :src="cmch" height="170px"></v-img>
          <v-list-item class="px-2">
            <v-list-item-content>
              <v-list-item-title class="font-weight-bold pl-1">
                Chittagong Medical College
              </v-list-item-title>
              <p class="expert_title pl-1">Chittagong</p>
              <p class="expert_title pl-1">+880181654526</p>
              <v-rating
                v-model="rating"
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
          <h3 class="pa-1">ABOUT CMCH</h3>
          <v-divider />
          <p style="font-size: 13px" class="pa-1">{{ hospital_details }}</p>
        </v-card>
      </v-col>
      <v-col cols="12" sm="8" class="pa-0">
        <Doctors :hospital="true" />
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
import Doctors from '../Doctors/Doctors'
export default {
  name: 'Details',
  components: { Doctors },
  data() {
    return {
      hospital: [],
      cmch,
      applo,
      chvr,
      dmc,
      beh,
      dc1,
      dc2,
      dc3,
      dc4,
      rating: 3,
      hospital_details:
        'Chittagong Medical College (CMC) is situated in the port city of Chittagong, Bangladesh and is the oldest medical college in the south-eastern part of the country. It is affiliated with a tertiary level hospital where clinical students are trained in medicine, surgery, obstetrics and gynaecology and other sub-specialties.[citation needed] Currently, students from Bhutan, India, Iran, Malaysia, Nepal, Palestine, Pakistan, and Sri Lanka are studying in various phases of MBBS course alongside the native student',
    }
  },
}
</script>

<style scoped></style>
