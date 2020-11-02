<template>
  <v-container>
    <v-row>
      <h1 class="black--text">Appointment List</h1>
      <v-col cols="12" sm="12">
        <v-card light outlined flat>
          <v-card-title>
            List
            <v-spacer></v-spacer>
            <v-text-field
              v-model="search"
              append-icon="mdi-magnify"
              label="Search"
              single-line
              hide-details
            ></v-text-field>
          </v-card-title>
          <v-data-table
            :headers="headers"
            :items="lists"
            :search="search"
            :loading="loading"
            loading-text="Please Wait..Loading..."
          >
            <template #item.edit="{ item }">
              <v-dialog v-model="dialog2" persistent max-width="290">
                <template v-slot:activator="{ on, attrs }">
                  <v-btn
                    icon
                    dark
                    color="teal"
                    v-bind="attrs"
                    v-on="on"
                    @click="cancelAppointment(item)"
                  >
                    <v-icon dark v-bind="attrs" v-on="on">
                      mdi-cloud-outline
                    </v-icon>
                  </v-btn>
                </template>
                <v-card class="text-center" light>
                  <v-card-actions align="center">
                    <v-spacer />
                    <v-card-title class="headline text-center" align="center">
                      Upload Your Prescription Files?
                    </v-card-title>
                    <v-spacer />
                  </v-card-actions>
                  <v-card-actions align="center">
                    <v-spacer />
                    <v-icon x-large color="red">mdi-cloud</v-icon>
                    <v-spacer />
                  </v-card-actions>
                  <v-file-input
                    v-model="prescription_file"
                    placeholder="Upload your documents"
                    label="File input"
                    multiple
                    shaped
                    outlined
                    class="pa-2"
                  >
                    <template v-slot:selection="{ text }">
                      <v-chip small label>
                        {{ text }}
                      </v-chip>
                    </template>
                  </v-file-input>
                  <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="green darken-1" text @click="dialog2 = false">
                      cancel
                    </v-btn>
                    <v-btn color="green darken-1" text @click="dialog2 = false">
                      Upload
                    </v-btn>
                  </v-card-actions>
                </v-card>
              </v-dialog>
            </template>
            <template #item.delete="{ item }">
              <v-dialog v-model="dialog" persistent max-width="290">
                <template v-slot:activator="{ on, attrs }">
                  <v-btn
                    icon
                    color="red"
                    v-bind="attrs"
                    v-on="on"
                    @click="cancelAppointment(item)"
                  >
                    <v-icon dark v-bind="attrs" v-on="on"> mdi-delete </v-icon>
                  </v-btn>
                </template>
                <v-card class="text-center">
                  <v-card-actions align="center">
                    <v-spacer />
                    <v-card-title class="headline text-center" align="center">
                      Are You Sure?
                    </v-card-title>
                    <v-spacer />
                  </v-card-actions>

                  <v-card-actions align="center">
                    <v-spacer />
                    <v-icon x-large color="red">mdi-delete</v-icon>
                    <v-spacer />
                  </v-card-actions>
                  <v-card-text>
                    If you do agree, your appointment will be cancelled.
                  </v-card-text>
                  <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="green darken-1" text @click="dialog = false">
                      Disagree
                    </v-btn>
                    <v-btn color="green darken-1" text @click="dialog = false">
                      Agree
                    </v-btn>
                  </v-card-actions>
                </v-card>
              </v-dialog>
            </template>
          </v-data-table>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: 'GigList',
  data() {
    return {
      tab: null,
      prescription_file: null,
      dialog: false,
      dialog2: false,
      loading: false,
      search: '',
      pause: false,
      headers: [
        {
          text: 'Doctor',
          align: 'start',
          value: 'doctor',
        },
        {
          text: 'Hospital',
          value: 'hospital',
        },
        {
          text: 'Time',
          value: 'time',
        },
        {
          text: 'Date',
          value: 'date',
        },
        {
          text: 'Upload Prescription',
          value: 'edit',
          align: 'center',
        },
        {
          text: 'Delete',
          value: 'delete',
        },
      ],
      lists: [
        {
          doctor: 'Dr. Yusuf',
          hospital: 'Chittagong Medical College',
          time: '9.30 PM',
          date: '5/11/2020',
        },
        {
          doctor: 'Dr. Ismail',
          hospital: 'CSCR',
          time: '9.30 PM',
          date: '6/11/2020',
        },
        {
          doctor: 'Dr. Selina',
          hospital: 'Chevron',
          time: '9.30 PM',
          date: '8/11/2020',
        },
      ],
    }
  },
  methods: {
    storeItemData(data) {
      // localStorage.setItem('gigData', JSON.stringify(data))
      // this.$router.push('/dashboard/gig')
    },
    cancelAppointment(item) {},
  },
}
</script>

<style scoped></style>
