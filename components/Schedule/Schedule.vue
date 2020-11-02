<template>
  <v-container>
    <h1 class="black--text text-uppercase text-center mb-2">Make A Reminder</h1>
    <v-row>
      <v-col cols="12" sm="4">
        <v-card flat outlined light height="300">
          <v-list-item class="px-4 mt-10">
            <v-spacer />
            <v-list-item-avatar rounded size="100" color="transparent">
              <v-img
                class="rounded-circle"
                src="https://cdn.vuetifyjs.com/images/cards/sunshine.jpg"
              ></v-img>
            </v-list-item-avatar>
            <v-spacer />
          </v-list-item>
          <v-list-item>
            <v-list-item-content class="">
              <v-list-item-title class="d-flex justify-center font-weight-bold">
                Md Yusuf Bin Nur
              </v-list-item-title>
              <v-list-item-subtitle class="d-flex justify-center"
                >Gender : Male</v-list-item-subtitle
              >
              <v-list-item-subtitle class="d-flex justify-center"
                >Age : 24</v-list-item-subtitle
              >
              <v-list-item-subtitle class="d-flex justify-center"
                >Contact : +8801815625375</v-list-item-subtitle
              >
            </v-list-item-content>
          </v-list-item>
        </v-card>
        <v-card flat outlined class="mt-5" light>
          <h2 class="pa-2">Schedule List</h2>
          <v-divider />
        </v-card>
        <v-card
          v-for="(reminder, i) in schedules"
          :key="i"
          outlined
          flat
          class="mt-3"
          light
        >
          <v-list-item>
            <v-list-item-content>
              <v-list-item-title> {{ reminder.medicine }} </v-list-item-title>
              <p style="font-size: 13px">
                {{ reminder.day }}, {{ reminder.time }}
              </p>
              <p style="font-size: 13px">End Date: {{ reminder.endDate }}</p>
            </v-list-item-content>
            <v-list-item-action>
              <v-btn small outlined icon color="red">
                <v-icon small dense> mdi-delete-outline </v-icon>
              </v-btn>
            </v-list-item-action>
          </v-list-item>
        </v-card>
      </v-col>
      <v-col cols="12" sm="8">
        <v-card flat light outlined>
          <v-form ref="form" v-model="valid" lazy-validation>
            <v-row no-gutters class="pa-5">
              <v-col cols="12" sm="6" class="pa-1">
                <v-text-field
                  v-model="medicine"
                  :rules="medRules"
                  outlined
                  light
                  label="Medicine"
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="6" class="pa-1">
                <v-select
                  v-model="selected_days"
                  :items="days"
                  :rules="dayRules"
                  chips
                  small-chips
                  light
                  label="Select Day"
                  multiple
                  outlined
                  aria-required="true"
                ></v-select>
              </v-col>
              <v-col cols="12" sm="6" class="pa-1">
                <v-menu
                  ref="menu"
                  v-model="menu2"
                  :close-on-content-click="false"
                  :nudge-right="40"
                  :return-value.sync="time"
                  transition="scale-transition"
                  offset-y
                  max-width="290px"
                  min-width="290px"
                >
                  <template v-slot:activator="{ on, attrs }">
                    <v-text-field
                      v-model="time"
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
                    v-model="time"
                    :rules="timeRules"
                    full-width
                    @click:minute="$refs.menu.save(time)"
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
                      v-model="date"
                      label="End Date"
                      readonly
                      outlined
                      :rules="endRules"
                      v-bind="attrs"
                      v-on="on"
                    ></v-text-field>
                  </template>
                  <v-date-picker
                    v-model="date"
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
                class="mb-8"
                :loading="loading"
                @click="createReminder"
                >Create a reminder</v-btn
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
  name: 'Schedule',
  data() {
    return {
      doctor: '',
      medicine: '',
      snackbar: false,
      loading: false,
      errorMessage: '',
      errorColor: '',
      valid: true,
      time: null,
      picker: null,
      date: null,
      menu2: false,
      menu3: false,
      schedules: [
        {
          medicine: 'Sergel 20Mg',
          type: 'capsule',
          day: ['saturday', 'sunday', 'monday'],
          time: '7.30 AM',
          endDate: '21/12/2020',
        },
        {
          medicine: 'Omidon 20Mg',
          type: 'capsule',
          day: ['saturday', 'sunday', 'monday'],
          time: '7.30 AM',
          endDate: '21/12/2020',
        },
        {
          medicine: 'Concor 5+',
          type: 'capsule',
          day: ['saturday', 'sunday', 'monday'],
          time: '7.30 AM',
          endDate: '21/12/2020',
        },
      ],
      selected_days: [],
      days: [
        'Saturday',
        'Sunday',
        'Monday',
        'Tuesday',
        'Wednesday',
        'Thursday',
        'Friday',
      ],
      medRules: [(v) => !!v || 'Medicine Name is required'],
      dayRules: [(v) => !!v || 'Please Select Day'],
      timeRules: [(v) => !!v || 'Please Select Your time'],
      endRules: [(v) => !!v || 'Please Select End Date Of You Schedule'],
    }
  },
  methods: {
    createReminder() {
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
