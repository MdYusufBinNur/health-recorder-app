<template>
  <v-container fluid>
    <v-layout justify-center align-center row wrap>
      <v-flex xs12 class="mb-5 mt-1 text-center">
        <h1 class="black--text">CHECKOUT OUR DOCTORS</h1>
      </v-flex>
    </v-layout>
    <v-layout justify-center align-center row wrap>
      <v-flex xs12 class="mb-10">
        <Doctors />
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import Doctors from '@/components/Doctors/Doctors'
export default {
  name: 'Index',
  components: {
    // eslint-disable-next-line vue/no-unused-components
    Doctors,
  },
}
</script>

<style scoped></style>
