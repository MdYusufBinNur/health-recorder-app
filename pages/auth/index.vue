<template>
  <v-container style="height: 700px">
    <Login />
  </v-container>
</template>

<script>
import Login from '@/components/Auth/Login'
export default {
  name: 'Index',
  layout: 'basic',
  components: { Login },
}
</script>

<style scoped></style>
