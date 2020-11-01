<template>
  <v-container>
    <h1 class="black--text text-uppercase text-center mb-2">Make A Schedule</h1>
    <v-row>
      <v-col cols="12" sm="4">
        <v-card flat outlined light height="350">
          <v-list-item class="px-4 mt-15">
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
          <v-list>
            <v-divider />
          </v-list>
        </v-card>
      </v-col>
      <v-col cols="12" sm="8">
        <v-card flat light>
          <v-form ref="form" v-model="valid" lazy-validation>
            <v-row no-gutters>
              <v-col cols="12" sm="6">
                <v-select
                  v-model="selected_days"
                  :items="days"
                  chips
                  light
                  label="Chips"
                  multiple
                  outlined
                ></v-select>
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
  name: 'Schedule',
  data() {
    return {
      snackbar: false,
      loading: false,
      errorMessage: '',
      errorColor: '',
      valid: true,
      schedules: [
        {
          medicine: 'Sergel 20Mg',
          type: 'capsule',
          alarm: [
            {
              day: 'Sat',
              time: '7.30 AM, 8.30 PM',
            },
            {
              day: 'Sun',
              time: '7.30 AM, 8.30 PM',
            },
          ],
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
    }
  },
}
</script>

<style scoped></style>
