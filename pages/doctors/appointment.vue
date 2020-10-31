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
                src="https://cdn.vuetifyjs.com/images/cards/sunshine.jpg"
              ></v-img>
            </v-list-item-avatar>

            <v-list-item-content>
              <v-list-item-title class="pl-1">
                Md Yusuf Bin Nur
              </v-list-item-title>
              <v-list-item-subtitle class="expert_title pl-1"
                >MBBS, FCPS</v-list-item-subtitle
              >
              <v-list-item-subtitle class="expert_title pl-1"
                >Neurologist</v-list-item-subtitle
              >
            </v-list-item-content>
          </v-list-item>
        </v-card>
        <v-card flat outlined class="mt-5" light>
          <h2 class="pa-2">Hospital List</h2>
          <v-divider />
          <v-list>
            <v-list-item v-for="(hospital, i) in hospitals" :key="i">
              <v-list-item-icon>
                <v-icon color="primary">mdi-arrow-right-drop-circle</v-icon>
              </v-list-item-icon>
              <v-list-item-content>
                <v-list-item-title> {{ hospital.name }} </v-list-item-title>
                <v-list-item-subtitle>
                  {{ hospital.title }}
                </v-list-item-subtitle>
                <p style="font-size: 11px">
                  {{ hospital.schedule }}
                </p>
                <p style="font-size: 11px">
                  {{ hospital.contact }}
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
                        @click="getAnAppointment(hospital)"
                      >
                        <v-icon x-small> mdi-call-made </v-icon>
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
                  disabled
                  prepend-inner-icon="mdi-hospital-building"
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="6" class="pa-1 mb-3">
                <v-text-field
                  v-model="doctor"
                  outlined
                  label="Doctor"
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
                  label="Name"
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
                  v-model="patient_mobile"
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
                >Apply</v-btn
              >
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
export default {
  name: 'Appointment',
  data() {
    return {
      rating: 3,
      tab: null,
      hospital: '',
      doctor: 'Md Yusuf',
      patient_name: '',
      patient_contact: '',
      patient_address: '',
      patient_mobile: '',
      patient_age: '',
      hospitals: [
        {
          name: 'Bangladesh Eye Hospital',
          location: 'Dhaka',
          contact: '+880 181 2564585',
          title: 'Neurologist, Medicine Specialist',
          schedule:
            'Friday - Saturday (3.30 pm - 7.00 pm), Wednesday(3.30 pm - 7.00 pm)',
        },
        {
          name: 'Dhaka Medical College (DMC)',
          location: 'Dhaka',
          contact: '+880 181 2564585',
          title: 'Neurologist, Medicine Specialist',
          schedule:
            'Friday - Saturday (3.30 pm - 7.00 pm), Wednesday(3.30 pm - 7.00 pm)',
        },
        {
          name: 'Chittagong Medical College (CMC)',
          location: 'Dhaka',
          contact: '+880 181 2564585',
          title: 'Neurologist, Medicine Specialist',
          schedule:
            'Friday - Saturday (3.30 pm - 7.00 pm), Wednesday(3.30 pm - 7.00 pm)',
        },
      ],
      valid: true,
      nameRules: [(v) => !!v || 'Name is required'],
      contactRules: [(v) => !!v || 'Contact is required'],
      ageRules: [(v) => !!v || 'Age is required'],
      hospitalRules: [(v) => !!v || 'Please Specify A Hospital Name'],
      snackbar: false,
      loading: false,
      errorMessage: '',
      errorColor: '',
    }
  },
  methods: {
    getAnAppointment(hospital) {
      this.hospital = hospital.name
    },
    applyForAppointment() {
      if (!this.$refs.form.validate()) {
        this.errorMessage = 'Please input valid data'
        this.errorColor = 'error'
        this.snackbar = true
        this.loading = false
      } else {
        this.loading = true
      }
    },
    validate() {
      this.$refs.form.validate()
    },
  },
}
</script>

<style scoped></style>
