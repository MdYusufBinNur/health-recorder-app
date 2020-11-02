<template>
  <v-container fluid class="mt-5">
    <v-layout justify-center align-center row wrap>
      <v-flex xs12 class="pa-0 text-center">
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
</template>

<script>
import Hospital from '../../components/Hospital/Hospital'
export default {
  name: 'Index',
  components: { Hospital },
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
