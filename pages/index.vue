<template>
  <v-row justify="center" align="center">
    <Slider />
    <v-container fluid class="mt-5">
      <v-layout justify-center align-center row wrap>
        <v-flex xs12 class="mb-5 mt-1 text-center">
          <span :class="bp.mdAndUp ? 'large_title' : 'small_text'"
            >TRUSTED BY THOUSANDS OF DOCTORS, HOSPITALS, DONORS</span
          >
        </v-flex>
      </v-layout>
      <v-layout justify-center align-center row wrap>
        <v-flex xs12 class="mb-10">
          <Trusted />
        </v-flex>
      </v-layout>
    </v-container>
    <v-container fluid class="grey lighten-4 mt-5">
      <v-layout justify-center align-center row wrap>
        <v-flex xs12 class="mb-5 mt-1 text-center">
          <span :class="bp.mdAndUp ? 'large_title' : 'small_text'"
            >CHECKOUT OUR DOCTORS</span
          >
        </v-flex>
      </v-layout>
      <v-layout justify-center align-center row wrap>
        <v-flex xs12 class="mb-10">
          <Doctors />
        </v-flex>
      </v-layout>
    </v-container>
    <v-container fluid class="mt-5">
      <v-layout justify-center align-center row wrap>
        <v-flex xs12 class="mb-5 mt-1 text-center">
          <span :class="bp.mdAndUp ? 'large_title' : 'small_text'"
            >CHECKOUT LISTED HOSPITALS</span
          >
        </v-flex>
      </v-layout>
      <v-layout justify-center align-center row wrap>
        <v-flex xs12 class="mb-10">
          <Hospital />
        </v-flex>
      </v-layout>
    </v-container>
  </v-row>
</template>

<script>
import Doctors from '@/components/Doctors/Doctors'
import Slider from '@/components/Slider/Slider'
import Trusted from '@/components/Trusted/Trusted'
import Hospital from '../components/Hospital/Hospital'
export default {
  title: 'Home',
  components: { Hospital, Slider, Trusted, Doctors },
}
</script>
<style scoped>
.large_title {
  font-size: 30px;
  font-family: 'Roboto', sans-serif;
  font-weight: bold;
  color: #000000;
  text-align: center;
}

.small_text {
  font-size: 15px;
  font-family: 'Roboto', sans-serif;
  font-weight: bold;
  color: #000000;
  text-align: center;
}
</style>
