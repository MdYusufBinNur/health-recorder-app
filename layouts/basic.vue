<template>
  <v-app>
    <v-main class="grey lighten-5">
      <v-container fluid>
        <nuxt />
      </v-container>
    </v-main>
    <v-footer :absolute="!fixed" app light>
      <span>&copy; {{ new Date().getFullYear() }}</span>
    </v-footer>
  </v-app>
</template>

<script>
export default {
  data() {
    return {
      clipped: false,
      drawer: false,
      fixed: false,
      items: [
      ],
      miniVariant: false,
      right: true,
      rightDrawer: false,
      title: 'Vuetify.js',
      menus: [
        {
          icon: 'mdi-apps',
          text: 'Home',
          to: '/',
        },
        {
          icon: 'mdi-apps',
          text: 'Hospitals',
          to: '/hospitals',
        },
        {
          icon: 'mdi-apps',
          text: 'Schedule',
          to: '/schedule',
        },
        {
          icon: 'mdi-apps',
          text: 'Appointment List',
          to: '/dashboard/appointment/list',
        },
        {
          icon: 'mdi-apps',
          text: 'Doctors',
          to: '/doctors',
        },
        {
          icon: 'mdi-apps',
          text: 'Login',
          to: '/auth',
        },
      ],
    }
  },
}
</script>
