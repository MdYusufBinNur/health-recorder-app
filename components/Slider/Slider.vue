<template>
  <v-carousel hide-delimiters :style="bp.mdAndUp ? 'margin-top: -12px' : ''">
    <v-carousel-item
      v-for="(item, i) in items"
      :key="i"
      :src="item.src"
    ></v-carousel-item>
  </v-carousel>
</template>

<script>
// eslint-disable-next-line import/no-duplicates,no-unused-vars
import wh1 from '@/assets/slider/wh1.jpg'
import wh2 from '@/assets/slider/wh2.jpg'
import wh3 from '@/assets/slider/wh3.jpg'
import wh4 from '@/assets/slider/wh4.jpg'
import wh5 from '@/assets/slider/wh5.jpg'
export default {
  name: 'Slider',
  data() {
    return {
      items: [
        {
          src: wh1,
        },
        {
          src: wh2,
        },
        {
          src: wh3,
        },
        {
          src: wh4,
        },
        {
          src: wh5,
        },
      ],
    }
  },
}
</script>

<style scoped></style>
