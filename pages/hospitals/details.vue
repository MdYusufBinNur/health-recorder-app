<template>
  <v-container class="pa-0">
    <HospitalDetails />
  </v-container>
</template>

<script>
import HospitalDetails from '../../components/Hospital/Details'
export default {
  name: 'Details',
  components: { HospitalDetails },
  data() {
    return {
      hospital: [],
    }
  },
  method: {
    setHospitalData() {
      if (this.$route.params.hospital != null) {
        // eslint-disable-next-line no-console
        console.log(this.$route.params.hospital)
        this.hospital = this.$route.params.hospital
      }
    },
  },
  created() {
    // eslint-disable-next-line no-unused-expressions
    this.setHospitalData
  },
}
</script>

<style scoped></style>
