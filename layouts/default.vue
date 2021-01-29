<template>
  <v-app>
    <v-navigation-drawer v-model="drawer" :clipped="clipped" fixed app>
      <v-list>
        <v-list-item
          v-for="(item, i) in menus"
          :key="i"
          :to="item.to"
          router
          exact
        >
          <v-list-item-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title v-text="item.text" />
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-app-bar :clipped-left="clipped" fixed app flat dense light>
      <v-app-bar-nav-icon v-if="bp.smAndDown" @click.stop="drawer = !drawer" />
      <v-btn v-if="bp.smAndDown" icon @click.stop="clipped = !clipped">
        <v-icon>mdi-application</v-icon>
      </v-btn>
      <v-img
        class="mt-0 pt-0"
        :src="logo"
        :alt="title"
        aspect-ratio="6"
        :max-height="this.$vuetify.breakpoint.mdAndUp ? '48' : '42'"
        max-width="180"
        contain
      ></v-img>
      <v-btn
        text
        small
        class="font-weight-bold"
        color="primary"
        :style="bp.mdAndUp ? 'margin-left : -75px' : ''"
        >Health Care</v-btn
      >
      <v-spacer />
      <div v-if="bp.mdAndUp">
        <v-btn v-for="(menu, i) in menus" :key="i" text small :to="menu.to">
          {{ menu.text }}
        </v-btn>
        <v-btn text large color="primary" @click="logout()">
          Sign Out
          <v-icon dense right> mdi-account-arrow-right </v-icon>
        </v-btn>
      </div>
    </v-app-bar>
    <v-main class="grey lighten-5">
      <v-container fluid>
        <nuxt />
      </v-container>
    </v-main>
    <v-navigation-drawer v-model="rightDrawer" :right="right" temporary fixed>
      <v-list>
        <v-list-item @click.native="right = !right">
          <v-list-item-action>
            <v-icon light> mdi-repeat </v-icon>
          </v-list-item-action>
          <v-list-item-title>Switch drawer (click me)</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-footer :absolute="!fixed" app light>
      <span>&copy; {{ new Date().getFullYear() }}</span>
    </v-footer>
  </v-app>
</template>

<script>
export default {
  middleware: ['authentication'],
  data() {
    return {
      clipped: false,
      drawer: false,
      fixed: false,
      items: [
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
          text: 'Donors',
          to: '/donors',
        },
        {
          icon: 'mdi-apps',
          text: 'Ambulance',
          to: '/ambulance',
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
      ],
    }
  },
  methods: {
    logout() {
      this.$store.dispatch('auth/logout')
      this.$router.push('/auth')
    },
  },
}
</script>
