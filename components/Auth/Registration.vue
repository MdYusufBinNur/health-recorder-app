<template>
  <div align="center">
    <v-card :class="bp.mdAndUp ? 'text-center' : 'pa-3'" outlined flat :width="$vuetify.breakpoint.mdAndUp ? '600' : '450'">
      <v-card-text>
        <v-form
          ref="form"
          v-model="valid"
          lazy-validation>
          <v-row>
            <v-col :cols="$vuetify.breakpoint.mdAndUp ? '6' : '12'">
              <v-text-field
                v-model="registrationData.first_name"
                :rules="validationRules.firstName"
                color="secondary"
                outlined
                label="First Name"
                hide-details="auto"
                required
                type="text"
              ></v-text-field>
            </v-col>
            <v-col :cols="$vuetify.breakpoint.mdAndUp ? '6' : '12'">
              <v-text-field
                v-model="registrationData.last_name"
                :rules="validationRules.lastName"
                color="secondary"
                outlined
                label="Last Name"
                hide-details="auto"
                required
                type="text"
              ></v-text-field>
            </v-col>
            <v-col :cols="$vuetify.breakpoint.mdAndUp ? '6' : '12'">
              <v-text-field
                v-model="registrationData.email"
                :rules="validationRules.email"
                color="secondary"
                outlined
                label="Email"
                hide-details="auto"
                required
                type="email"
              ></v-text-field>
            </v-col>
            <v-col :cols="$vuetify.breakpoint.mdAndUp ? '6' : '12'">
              <v-text-field
                v-model="registrationData.phone"
                :rules="validationRules.phone"
                color="secondary"
                outlined
                label="Phone"
                hide-details="auto"
                required
                type="tel"
              ></v-text-field>
            </v-col>
            <v-col cols="12">
              <v-autocomplete
                v-model="registrationData.country"
                :rules="validationRules.required"
                :items="countries"
                outlined
                hide-details="auto"
                label="Countries"
                clearable
              ></v-autocomplete>
            </v-col>
            <v-col :cols="$vuetify.breakpoint.mdAndUp ? '12' : '12'">
              <v-text-field
                v-model="registrationData.password"
                :rules="validationRules.password"
                outlined
                color="secondary"
                :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
                label="Password"
                :type="showPassword ? 'text' : 'password'"
                hide-details="auto"
                required
                @click:append="showPassword = !showPassword"
              ></v-text-field>
            </v-col>
            <v-col cols="12" align="start" class="pa-0 pl-3">
              <v-checkbox
                v-model="agreement"
                color="deep-purple"
              >
                <template v-slot:label>
                  I agree to the&nbsp;
                  <a href="#" @click.stop.prevent="dialog = true">Terms of Service</a>
                  &nbsp;and&nbsp;
                  <a href="#" @click.stop.prevent="dialog = true">Privacy Policy</a>*
                </template>
              </v-checkbox>
            </v-col>
          </v-row>
        </v-form>
      </v-card-text>
      <v-card-actions class="text-center">
        <v-btn
          block
          large
          class="success mb-5"
          :loading="isLoading"
          @click="login()"
        >
          Create
        </v-btn>
      </v-card-actions>
    </v-card>
    <v-dialog
      v-model="dialog"
      absolute
      max-width="400"
      persistent
    >
      <v-card>
        <v-card-title class="headline grey lighten-3">Legal</v-card-title>
        <v-card-text>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore
          magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
          consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
          pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id
          est laborum.
        </v-card-text>
        <v-divider></v-divider>
        <v-card-actions>
          <v-btn
            text
            @click="agreement = false, dialog = false"
          >
            No
          </v-btn>
          <v-spacer></v-spacer>
          <v-btn
            class="white--text"
            color="deep-purple accent-4"
            @click="agreement = true, dialog = false"
          >
            Yes
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-snackbar
      v-model="snackbar"
      :color="errorColor"
      top
      right
    >
      {{ errorMessage }}
      <template v-slot:action="{ attrs }">
        <v-btn
          color="white"
          text
          v-bind="attrs"
          @click="snackbar = false"
        >
          <v-icon>mdi-close</v-icon>
        </v-btn>

      </template>
    </v-snackbar>
    <v-flex xs12 class="text-center mt-5">
      <p>Already have account?</p>
    </v-flex>
    <v-card class="text-center transparent" flat :width="$vuetify.breakpoint.mdAndUp ? '400' : '300'">

      <v-card-actions class="text-center">
        <v-btn
          text
          block
          large
          to="login"
          color="teal"
          class="white--text"
        >
          Sign In
        </v-btn>
      </v-card-actions>
    </v-card>
  </div>
</template>
<script>
import {mapGetters} from 'vuex';
import validationMixin from "@/mixins/validationMixin";
import errorMessagesMixin from "@/mixins/errorMessagesMixin";

export default {
  props: {
    isDialog: {
      type: Boolean,
      required: false,
      default() {
        return false
      }
    }
  },
  data: () => ({
    role: true,
    selectedRole: 'designer',
    agreement: false,
    dialog: false,
    form: false,
    isLoading: false,
    valid: true,
    showPassword: false,
    countries: [],
    snackbar: false,
    errorMessage: '',
    errorColor: '',
    registrationData: {
      first_name: null,
      last_name: null,
      email: null,
      phone: null,
      country: null,
      address: null,
      role: 'user',
      password: null,
    }
  }),
  mixins: [validationMixin, errorMessagesMixin],
  computed: {
    ...mapGetters({
      authToken: 'auth/auth'
    }),
    loginInfo() {
      return {
        email: this.email,
        password: this.password
      }
    }
  },
  created() {
    this.initCountries()
  },
  methods: {
    initCountries() {
      const {getNameList} = require('country-list');
      this.countries = Object.keys(getNameList())
    },
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
        this.$router.push('/login')

      }
    },
    login() {
      this.isLoading = true
      if (!this.$refs.form.validate()) {
        this.errorMessage = 'Please input valid data'
        this.errorColor = 'error'
        this.snackbar = true
        this.isLoading = false
        return ;
      }
      if (!this.agreement) {
        this.errorMessage = 'Please accept our terms and conditions'
        this.errorColor = 'error'
        this.snackbar = true
        this.isLoading = false
        return ;
      }
      else {
        this.resetValidation()

        this.$store.dispatch('auth/registration', this.registrationData)
          .then((response) => {
            this.goToSourceDestination()
            //console.log(response)
            this.errorMessage = response.data.data.message
            this.errorColor = 'success'
            this.snackbar = true
            //this.$toast.success(response.data.data.message)
          })
          .catch((error) => {
            // console.log(error)
            // console.log("1 error ==> " , error)
            // console.log("2 error ==> ",error)
            // console.log("3 error ==> ",error.message)
            // this.setErrorMessages(error.response.data.errors)
            // this.$toast.error("Error")
            this.errorMessage = error.message
            this.errorColor = 'error'
            this.snackbar = true
          })
          .finally(() => {
            this.isLoading = false
          })
      }
    },
    checkAuth(next, path) {
      console.log(next)
      // only admin-group has the access to any property without association
      if (this.authToken !== null) {
        this.$router.push('/');
      } else {
        this.$router.push('/auth');
      }
    },
    selectRole() {
      this.role = true
    }
  }
}
</script>
