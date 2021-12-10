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
            <!--            <template #item.edit="{ item }">-->
            <!--              <v-dialog v-model="dialog2" persistent max-width="290">-->
            <!--                <template v-slot:activator="{ on, attrs }">-->
            <!--                  <v-btn-->
            <!--                    icon-->
            <!--                    dark-->
            <!--                    color="teal"-->
            <!--                    v-bind="attrs"-->
            <!--                    v-on="on"-->
            <!--                    @click="cancelAppointment(item)"-->
            <!--                  >-->
            <!--                    <v-icon dark v-bind="attrs" v-on="on">-->
            <!--                      mdi-cloud-outline-->
            <!--                    </v-icon>-->
            <!--                  </v-btn>-->
            <!--                </template>-->
            <!--                <v-card class="text-center" light>-->
            <!--                  <v-card-actions align="center">-->
            <!--                    <v-spacer />-->
            <!--                    <v-card-title class="headline text-center" align="center">-->
            <!--                      Upload Your Prescription Files?-->
            <!--                    </v-card-title>-->
            <!--                    <v-spacer />-->
            <!--                  </v-card-actions>-->
            <!--                  <v-card-actions align="center">-->
            <!--                    <v-spacer />-->
            <!--                    <v-icon x-large color="red">mdi-cloud</v-icon>-->
            <!--                    <v-spacer />-->
            <!--                  </v-card-actions>-->
            <!--                  <v-file-input-->
            <!--                    v-model="prescription_file"-->
            <!--                    placeholder="Upload your documents"-->
            <!--                    label="File input"-->
            <!--                    multiple-->
            <!--                    shaped-->
            <!--                    outlined-->
            <!--                    class="pa-2"-->
            <!--                  >-->
            <!--                    <template v-slot:selection="{ text }">-->
            <!--                      <v-chip small label>-->
            <!--                        {{ text }}-->
            <!--                      </v-chip>-->
            <!--                    </template>-->
            <!--                  </v-file-input>-->
            <!--                  <v-card-actions>-->
            <!--                    <v-spacer></v-spacer>-->
            <!--                    <v-btn color="green darken-1" text @click="dialog2 = false">-->
            <!--                      cancel-->
            <!--                    </v-btn>-->
            <!--                    <v-btn color="green darken-1" text @click="dialog2 = false">-->
            <!--                      Upload-->
            <!--                    </v-btn>-->
            <!--                  </v-card-actions>-->
            <!--                </v-card>-->
            <!--              </v-dialog>-->
            <!--            </template>-->
            <!--            <template #item.delete="{ item }">-->
            <!--              <v-dialog v-model="dialog" persistent max-width="290">-->
            <!--                <template v-slot:activator="{ on, attrs }">-->
            <!--                  <v-btn-->
            <!--                    icon-->
            <!--                    color="red"-->
            <!--                    v-bind="attrs"-->
            <!--                    v-on="on"-->
            <!--                    @click="cancelAppointment(item)"-->
            <!--                  >-->
            <!--                    <v-icon dark v-bind="attrs" v-on="on"> mdi-delete </v-icon>-->
            <!--                  </v-btn>-->
            <!--                </template>-->
            <!--                <v-card class="text-center">-->
            <!--                  <v-card-actions align="center">-->
            <!--                    <v-spacer />-->
            <!--                    <v-card-title class="headline text-center" align="center">-->
            <!--                      Are You Sure?-->
            <!--                    </v-card-title>-->
            <!--                    <v-spacer />-->
            <!--                  </v-card-actions>-->

            <!--                  <v-card-actions align="center">-->
            <!--                    <v-spacer />-->
            <!--                    <v-icon x-large color="red">mdi-delete</v-icon>-->
            <!--                    <v-spacer />-->
            <!--                  </v-card-actions>-->
            <!--                  <v-card-text>-->
            <!--                    If you do agree, your appointment will be cancelled.-->
            <!--                  </v-card-text>-->
            <!--                  <v-card-actions>-->
            <!--                    <v-spacer></v-spacer>-->
            <!--                    <v-btn color="green darken-1" text @click="dialog = false">-->
            <!--                      Disagree-->
            <!--                    </v-btn>-->
            <!--                    <v-btn color="green darken-1" text @click="dialog = false">-->
            <!--                      Agree-->
            <!--                    </v-btn>-->
            <!--                  </v-card-actions>-->
            <!--                </v-card>-->
            <!--              </v-dialog>-->
            <!--            </template>-->
            <template #item.action="{ item }">
              <v-btn
                v-if="item.payment === 0"
                text
                outlined
                class="info darken-4 white--text"
                x-small
                rounded
                @click="makePayment(item)"
              >
                Make Payment
              </v-btn>
              <v-btn
                v-else
                text
                outlined
                class="success darken-4 white--text"
                x-small
                rounded
              >
                Paid
              </v-btn>
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
    <v-snackbar v-model="snackbar" :color="errorColor" top right>
      {{ errorMessage }}
      <template v-slot:action="{ attrs }">
        <v-btn color="white" text v-bind="attrs" @click="snackbar = false">
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </template>
    </v-snackbar>

    <v-dialog v-model="dialog" width="500" style="background: deeppink" light>
      <v-card style="background: deeppink">
        <v-form ref="form">
          <v-card-actions class="pa-0 px-10" style="background: white">
            <v-img :src="bkash" width="100" class="px-3" />
          </v-card-actions>
          <v-card-text class="justify-center" align="center">
            <v-card
              elevation="4"
              class="transparent justify-center ma-5"
              width="400"
              height="120"
              rounded
              align="center"
            >
              <v-list-item class="" dense>
                <v-list-item-title
                  class="white--text"
                  style="text-decoration-style: solid"
                  >Merchant ID: BDH4J2XSLO09
                </v-list-item-title>
              </v-list-item>
              <v-list-item dense>
                <v-list-item-title class="white--text"
                  >Invoice : 9KLIDH4J2XSLW4XA33
                </v-list-item-title>
              </v-list-item>
              <v-list-item dense>
                <v-list-item-title class="white--text"
                  >Total payment : {{ amount }} BDT
                </v-list-item-title>
              </v-list-item>
            </v-card>

            <v-card-text align="center" style="color: white">
              Enter your bkash account number
            </v-card-text>
            <v-text-field
              v-model="payment_info.payment_mobile"
              dense
              hide-details="auto"
              class="text-center"
              solo
              color="black"
              required
              style="background: white; width: 200px"
              placeholder="e.g : 01XXXXXXXXXX"
            ></v-text-field>
          </v-card-text>

          <v-card-text class="justify-center" align="center">
            <v-card-actions
              class="justify-content-center"
              style="justify-content: center; color: white"
            >
              <v-checkbox
                align="center"
                label="I agree to the terms and conditions"
                class=""
                dark
                dense
                color="white"
              ></v-checkbox>
            </v-card-actions>
            <v-card-actions style="justify-content: center">
              <v-btn
                class="px-5 white--text"
                style="background: rgba(7, 7, 7, 0.22)"
                elevation="2"
                :loading="loading"
                @click="payment"
              >
                submit
              </v-btn>
              <v-btn
                class="px-5 white--text"
                style="background: rgba(7, 7, 7, 0.22)"
                elevation="2"
                @click="closePayment"
              >
                clear
              </v-btn>
            </v-card-actions>
            <v-card-actions style="justify-content: center">
              <v-btn class="px-5 white--text" plain text>
                <v-icon small color="white"> mdi-cellphone </v-icon>
                16247
              </v-btn>
            </v-card-actions>
          </v-card-text>
        </v-form>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script>
import bkash from '~/static/bkash_payment_logo.png'

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
      amount: 0,
      errorColor: '',
      snackbar: false,
      errorMessage: '',
      payment_info: {
        appointment_id: null,
        payment_mobile: null,
      },
      bkash,
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
          value: 'time',
        },
        {
          text: 'Date',
          value: 'date',
        },
        // {
        //   text: 'Upload Prescription',
        //   value: 'edit',
        //   align: 'center',
        // },
        {
          text: 'Status',
          value: 'status',
          align: 'center',
        },
        {
          text: 'Action',
          value: 'action',
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
    payment() {
      if (
        this.payment_info.appointment_id !== null &&
        this.payment_info.payment_mobile !== null
      ) {
        this.loading = true
        return this.$axios
          .post('/savePayment', this.payment_info)
          .then((response) => {
            this.errorMessage = response.data.message
            this.getAppointmentList()
            this.closePayment()
          })
          .catch((error) => {
            this.errorMessage = error.response.data.message
            this.snackbar = true
          })
          .finally(() => {
            this.loading = false
          })
      }
    },
    makePayment(item) {
      this.dialog = true
      this.amount = item.amount
      this.payment_info.appointment_id = item.id
    },
    closePayment() {
      this.dialog = false
      this.amount = 0
      this.payment_info.appointment_id = null
      this.payment_info.payment_mobile = null
      this.$refs.form.reset()
    },
  },
}
</script>

<style scoped></style>
