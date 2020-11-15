<template>
  <div
    align="center"
    :style="bp.mdAndUp ? 'margin-top: 90px' : 'margin-top: 80px'"
  >
    <h1 class="black--text mb-2">Login</h1>
    <v-card
      class="text-center"
      outlined
      flat
      light
      :width="$vuetify.breakpoint.mdAndUp ? '400' : '300'"
    >
      <v-card-text>
        <v-form ref="form" v-model="valid" lazy-validation>
          <v-row>
            <v-col cols="12">
              <v-text-field
                v-model="email"
                color="secondary"
                :rules="emailRules"
                outlined
                label="Email"
                hide-details="auto"
                required
                prepend-inner-icon="mdi-account"
                type="email"
              ></v-text-field>
            </v-col>
            <v-col cols="12">
              <v-text-field
                v-model="password"
                outlined
                color="secondary"
                :rules="passwordRules"
                :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
                label="Password"
                :type="showPassword ? 'text' : 'password'"
                hide-details="auto"
                required
                prepend-inner-icon="mdi-lock"
                @click:append="showPassword = !showPassword"
              ></v-text-field>
            </v-col>
            <v-col cols="12" align="start" class="pa-0 pl-3">
              <nuxt-link to="" class="text-decoration-none black--text"
                >Forgot password</nuxt-link
              >
            </v-col>
          </v-row>
        </v-form>
      </v-card-text>
      <v-card-actions class="text-center">
        <v-btn
          block
          large
          class="success"
          :loading="isLoading"
          @click="login()"
        >
          Sign in
        </v-btn>
      </v-card-actions>
    </v-card>
    <v-snackbar v-model="snackbar" :color="errorColor" top right>
      {{ errorMessage }}
      <template v-slot:action="{ attrs }">
        <v-btn color="white" text v-bind="attrs" @click="snackbar = false">
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </template>
    </v-snackbar>
    <v-flex xs12 class="text-center mt-5">
      <p>OR</p>
    </v-flex>
    <v-card
      class="text-center transparent"
      flat
      :width="$vuetify.breakpoint.mdAndUp ? '400' : '300'"
    >
      <v-card-actions class="text-center">
        <v-btn block large to="registration" color="teal" class="white--text">
          Create Free Account
        </v-btn>
      </v-card-actions>
    </v-card>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
import TypeMixin from '@/mixins/typeMixin'
export default {
  mixins: [TypeMixin],
  props: {
    isDialog: {
      type: Boolean,
      required: false,
      default() {
        return false
      },
    },
  },
  data: () => ({
    isLoading: false,
    valid: true,
    showPassword: false,
    email: '',
    password: '',
    emailRules: [(v) => !!v || 'Email is required'],

    passwordRules: [(v) => !!v || 'Password is required'],

    isLoggedIn: false,
    snackbar: false,
    errorMessage: '',
    errorColor: '',
  }),

  computed: {
    ...mapGetters({
      authToken: 'auth/auth',
    }),
    loginInfo() {
      return {
        email: this.email,
        password: this.password,
      }
    },
  },

  // beforeRouteEnter(to, from, next) {
  //   console.log("before Route")
  //   if (to.path === '/auth') {
  //     next(vm => {
  //       console.log('next auth')
  //       vm.checkAuth(next)
  //     })
  //   } else {
  //     console.log('yusuf')
  //     next('/auth')
  //   }
  // },

  methods: {
    validate() {
      this.$refs.form.validate()
    },

    resetValidation() {
      this.$refs.form.resetValidation()
    },

    goToSourceDestination() {
      if (this.isDialog) {
        this.$emit('closeAuthentication')
      } else {
        this.$router.push('/')
      }
    },

    login() {
      this.isLoading = true
      // this.$router.push('/dashboard')
      if (!this.$refs.form.validate()) {
        this.errorMessage = 'Please input valid data'
        this.errorColor = 'error'
        this.snackbar = true
        this.isLoading = false
      } else {
        this.resetValidation()
        this.$store
          .dispatch('auth/postLogin', this.loginInfo)
          .then((response) => {
            if (response.data.message) {
              this.errorMessage = response.data.message
              this.errorColor = 'error'
              this.snackbar = true
            }
            this.goToSourceDestination()
          })
          // eslint-disable-next-line handle-callback-err
          .catch((error) => {
            this.errorMessage = error.toString()
            this.errorColor = 'error'
            this.snackbar = true
          })
          .finally(() => {
            this.isLoading = false
          })
      }
    },

    checkAuth(next, path) {
      // only admin-group has the access to any property without association
      if (this.authToken !== null) {
        this.$router.push('/')
      } else {
        this.$router.push('/auth')
      }
    },
  },
}
</script>
