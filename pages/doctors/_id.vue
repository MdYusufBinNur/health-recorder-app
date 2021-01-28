<template>
  <v-container>
    <h1 class="black--text">Get an appointment</h1>
    <v-row>
      <v-col cols="12" sm="4">
        <v-card flat outlined light>
          <v-list-item class="px-4">
            <v-list-item-avatar
              rounded
              size="80"
              color="transparent"
              class="mr-2"
            >
              <v-img
                class="rounded-circle"
                :src="baseURL + doctor.image"
              ></v-img>
            </v-list-item-avatar>

            <v-list-item-content>
              <v-list-item-title class="pl-1">
                {{ doctor.name }}
              </v-list-item-title>
              <v-list-item-subtitle class="expert_title pl-1"
                >{{ doctor.designation }}
              </v-list-item-subtitle>
              <v-list-item-subtitle
                class="expert_title pl-1"
              ></v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
        </v-card>
        <v-card flat outlined class="mt-5" light>
          <h2 class="pa-2">Hospital List</h2>
          <v-divider />
          <v-list>
            <v-list-item>
              <v-list-item-icon>
                <v-icon color="primary">mdi-arrow-right-drop-circle</v-icon>
              </v-list-item-icon>
              <v-list-item-content>
                <v-list-item-title>
                  {{ dc_hospital.name }}
                </v-list-item-title>
                <v-list-item-subtitle>
                  {{ dc_dept.name }}
                </v-list-item-subtitle>
                <p style="font-size: 11px">
                  {{ doctor.day }}
                </p>
                <p style="font-size: 11px">
                  {{ dc_hospital.contact }}
                </p>
                <v-card-title>
                  <v-tooltip right>
                    <template v-slot:activator="{ on, attrs }">
                      <v-btn
                        color="primary"
                        dark
                        icon
                        x-small
                        outlined
                        style="margin-left: -15px"
                        v-bind="attrs"
                        v-on="on"
                        @click="getAnAppointment(dc_hospital)"
                      >
                        <v-icon x-small> mdi-call-made</v-icon>
                      </v-btn>
                    </template>
                    <span>Click To Get Appointment</span>
                  </v-tooltip>
                </v-card-title>
              </v-list-item-content>
            </v-list-item>
            <v-divider />
          </v-list>
        </v-card>
      </v-col>
      <v-col cols="12" sm="8">
        <v-card flat light>
          <v-form ref="form" v-model="valid" lazy-validation>
            <v-row no-gutters>
              <v-col cols="12" sm="6" class="pa-1 mb-3">
                <v-text-field
                  v-model="hospital"
                  :rules="hospitalRules"
                  outlined
                  label="Hospital"
                  hide-details="auto"
                  required
                  readonly
                  color="primary"
                  prepend-inner-icon="mdi-hospital-building"
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="6" class="pa-1 mb-3">
                <v-text-field
                  v-model="doctor.name"
                  outlined
                  label="Doctor"
                  :placeholder="doctor.name"
                  hide-details="auto"
                  required
                  disabled
                  prepend-inner-icon="mdi-account"
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="6" class="pa-1">
                <v-text-field
                  v-model="patient_name"
                  :rules="nameRules"
                  outlined
                  label="Patient Name"
                >
                </v-text-field>
              </v-col>
              <v-col cols="12" sm="6" class="pa-1">
                <v-text-field
                  v-model="patient_age"
                  :rules="ageRules"
                  outlined
                  label="Age"
                  type="number"
                >
                </v-text-field>
              </v-col>
              <v-col cols="12" sm="6" class="pa-1">
                <v-text-field
                  v-model="patient_contact"
                  :rules="contactRules"
                  outlined
                  label="Mobile"
                >
                </v-text-field>
              </v-col>
              <v-col cols="12" sm="6" class="pa-1">
                <v-text-field
                  v-model="patient_address"
                  outlined
                  label="Address"
                >
                </v-text-field>
              </v-col>
              <v-col cols="12" sm="6" class="pa-1">
                <v-menu
                  ref="menu"
                  v-model="menu2"
                  :close-on-content-click="false"
                  :nudge-right="40"
                  :return-value.sync="appointment_time"
                  transition="scale-transition"
                  offset-y
                  max-width="290px"
                  min-width="290px"
                >
                  <template v-slot:activator="{ on, attrs }">
                    <v-text-field
                      v-model="appointment_time"
                      :rules="timeRules"
                      label="Select time"
                      readonly
                      v-bind="attrs"
                      outlined
                      v-on="on"
                    ></v-text-field>
                  </template>
                  <v-time-picker
                    v-if="menu2"
                    v-model="appointment_time"
                    :rules="timeRules"
                    full-width
                    @click:minute="$refs.menu.save(appointment_time)"
                  ></v-time-picker>
                </v-menu>
              </v-col>
              <v-col cols="12" sm="6" class="pa-1">
                <v-menu
                  v-model="menu3"
                  :close-on-content-click="false"
                  :nudge-right="40"
                  transition="scale-transition"
                  offset-y
                  min-width="290px"
                >
                  <template v-slot:activator="{ on, attrs }">
                    <v-text-field
                      v-model="appointment_date"
                      label="Date"
                      readonly
                      outlined
                      :rules="endRules"
                      v-bind="attrs"
                      v-on="on"
                    ></v-text-field>
                  </template>
                  <v-date-picker
                    v-model="appointment_date"
                    @input="menu3 = false"
                  ></v-date-picker>
                </v-menu>
              </v-col>
            </v-row>
            <v-card-actions>
              <v-spacer />
              <v-btn
                right
                small
                color="primary"
                width="200px"
                :loading="loading"
                @click="applyForAppointment"
                >Apply
              </v-btn>
              <v-spacer />
            </v-card-actions>
          </v-form>
        </v-card>
      </v-col>
      <v-snackbar v-model="snackbar" :color="errorColor" top right>
        {{ errorMessage }}
        <template v-slot:action="{ attrs }">
          <v-btn color="white" text v-bind="attrs" @click="snackbar = false">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </template>
      </v-snackbar>
    </v-row>
  </v-container>
</template>
<script>
import { mapGetters } from 'vuex'

export default {
  name: 'Appointment',
  data() {
    return {
      rating: 3,
      tab: null,
      hospital: '',
      dc_hospital: {},
      dc_dept: {},
      doctor: {},
      valid: true,
      appointment_time: null,
      picker: null,
      appointment_date: '',
      menu2: false,
      menu3: false,
      nameRules: [(v) => !!v || 'Name is required'],
      contactRules: [(v) => !!v || 'Contact is required'],
      ageRules: [(v) => !!v || 'Age is required'],
      hospitalRules: [(v) => !!v || 'Please Specify A Hospital Name'],
      dayRules: [(v) => !!v || 'Please Select Day'],
      timeRules: [(v) => !!v || 'Please Select Your time'],
      endRules: [(v) => !!v || 'Please Select End Date Of You Schedule'],
      snackbar: false,
      loading: false,
      errorMessage: '',
      errorColor: '',
      hospital_id: '',
      user_id: '',
      doctor_id: '',
      patient_name: '',
      patient_contact: '',
      patient_address: '',
      patient_mobile: '',
      patient_age: '',
    }
  },
  created() {
    this.getHospitalList()
  },
  // eslint-disable-next-line vue/order-in-components
  computed: {
    ...mapGetters({
      authToken: 'auth/auth',
    }),
    appointmentInfo() {
      return {
        hospital_id: this.hospital_id,
        user_id: this.user_id,
        doctor_id: this.doctor_id,
        patient_name: this.patient_name,
        patient_contact: this.patient_contact,
        patient_address: this.patient_address,
        patient_age: this.patient_age,
        time: this.appointment_time,
        date: this.appointment_date,
      }
    },
  },
  methods: {
    getAnAppointment(hospital) {
      this.hospital = hospital.name
      this.hospital_id = this.dc_hospital.id
    },
    applyForAppointment() {
      if (!this.$refs.form.validate()) {
        this.errorMessage = 'Please input valid data'
        this.errorColor = 'error'
        this.snackbar = true
        this.loading = false
      } else {
        this.loading = true
        this.$store
          .dispatch('appointment/saveAppointment', this.appointmentInfo)
          .then((response) => {
            if (response.data.error) {
              this.errorColor = 'error'
            } else {
              this.errorColor = 'success'
            }
            this.errorMessage = response.data.message
            this.snackbar = true
            this.reset()
            this.loading = false
          })
          // eslint-disable-next-line handle-callback-err
          .catch((error) => {})
          .finally()
      }
    },
    getHospitalList() {
      try {
        this.$axios
          .get('/doctor/' + this.$route.params.id)
          .then((response) => {
            this.doctor = response.data
            this.dc_dept = response.data.department
            this.dc_hospital = response.data.hospital
            this.doctor_id = this.doctor.id
            this.user_id = this.userData.id
          })
          .finally()
      } catch (e) {}
    },
    validate() {
      this.$refs.form.validate()
    },
    reset() {
      this.$refs.form.reset()
    },
  },
}
</script>

<style scoped></style>
