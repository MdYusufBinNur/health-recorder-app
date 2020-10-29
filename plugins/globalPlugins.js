import Vue from 'vue'
import userRole from '@/mixins/userRole'

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
  },
  methods: {},
})
Vue.mixin(userRole)
