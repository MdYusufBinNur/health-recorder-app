import Vue from 'vue'
import userRole from '@/mixins/userRole'
import * as VueGoogleMaps from 'vue2-google-maps'

Vue.mixin({
  data() {
    return {
      tiny_api_key: 'mw34pc21bdb4huz4mvu639u3pka3tmggjygirmj07to8lhe8',
    }
  },
  computed: {
    bp() {
      return this.$vuetify.breakpoint
    },
    baseURL() {
      // return 'http://health-recorder.test/'
      return 'http://127.0.0.1:8000/'
    },
  },
  methods: {},
})
Vue.mixin(userRole)
Vue.use(VueGoogleMaps, {
  load: {
    key: 'AIzaSyCaElQyMCbsyjftm6nbFJxPDkN7G0rcRrA',
    libraries: 'places',
    // This is required if you use the Autocomplete plugin
    // OR: libraries: 'places,drawing'
    // OR: libraries: 'places,drawing,visualization'
    //     // (as you require)
    //     // If you want to set the version, you can do so:
    //     // v: '3.26',
  },
})
