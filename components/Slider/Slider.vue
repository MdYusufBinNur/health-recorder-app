<template>
  <v-carousel cycle hide-delimiters :style="bp.mdAndUp ? 'margin-top: -12px' : ''">
    <v-carousel-item
      v-for="(item, i) in sliders"
      :key="i"

      :src="baseURL + item.image"
    ></v-carousel-item>
  </v-carousel>
</template>

<script>
  export default {
    name: 'Slider',
    data() {
      return {
        sliders: {},
      }
    },
    created() {
      this.initSliders()
    },
    methods: {
      initSliders() {
        return this.$axios
          .get('/sliders')
          .then((response) => {
            this.sliders = response.data
          })
          .catch((error) => {

          })
          .finally(() => {

          })
      }
    }
  }
</script>

<style scoped></style>
