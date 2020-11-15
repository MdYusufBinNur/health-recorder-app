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
            <template #item.status="{ item }">
              <v-btn
                v-if="item.status === 'pending'"
                text
                outlined
                class="red darken-4 white--text"
                x-small
                rounded
              >
                {{ item.status }}
              </v-btn>
              <v-btn
                v-if="item.status === 'checked'"
                text
                outlined
                class="primary darken-2 white--text"
                x-small
                rounded
              >
                {{ item.status }}
              </v-btn>
            </template>
          </v-data-table>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: 'AppointmentList',
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
          value: 'doctor.name',
        },
        {
          text: 'Hospital',
          value: 'doctor.hospital.name',
        },
        {
          text: 'Time',
          value: 'app_time',
        },
        {
          text: 'Date',
          value: 'app_date',
        },
        {
          text: 'Upload Prescription',
          value: 'edit',
          align: 'center',
        },
        {
          text: 'Status',
          value: 'status',
          align: 'center',
        },
        {
          text: 'Delete',
          value: 'delete',
        },
      ],
      lists: [],
    }
  },
  created() {
    this.getAppointmentList()
  },
  methods: {
    cancelAppointment(item) {},
    getAppointmentList() {
      this.$store
        .dispatch('appointment/getAppointmentList', this.userData.id)
        .then((response) => {
          this.lists = response.data
        })
        .catch((error) => {
          console.log(error)
        })
    },
  },
}
</script>

<style scoped></style>
