<template>
  <v-container grid-list-lg class="pt-5">
    <v-layout row wrap justify-center align-center>
      <v-flex
        xs12
        sm6
        md4
        lg3
      >
        <v-hover v-slot:default="{ hover }" open-delay="10">
          <v-card
            :height="$vuetify.breakpoint.mdAndUp ? '250' : '250'"
            flat
            :elevation="hover ? 8 : 3"
            class="card_hover"
            light
          >
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-img
                class="icon_hover"
                center
                contain
                aspect-ratio="1"
                :src="doctor"
              ></v-img>

              <v-spacer></v-spacer>
            </v-card-actions>
            <v-list-item-content class="text-center mt-3">
              <v-list-item-title
                class="text_hover headline font-weight-bold text-uppercase"
                >{{ doctors }}</v-list-item-title
              >
              <v-list-item-title class="text_hover text-uppercase mt-2">
                Total Doctors
              </v-list-item-title>
            </v-list-item-content>
          </v-card>
        </v-hover>
      </v-flex>
      <v-flex
        xs12
        sm6
        md4
        lg3
      >
        <v-hover v-slot:default="{ hover }" open-delay="10">
          <v-card
            :height="$vuetify.breakpoint.mdAndUp ? '250' : '250'"
            flat
            :elevation="hover ? 8 : 3"
            class="card_hover"
            light
          >
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-img
                class="icon_hover"
                center
                contain
                aspect-ratio="1"
                :src="hospital"
              ></v-img>

              <v-spacer></v-spacer>
            </v-card-actions>
            <v-list-item-content class="text-center mt-3">
              <v-list-item-title
                class="text_hover headline font-weight-bold text-uppercase"
                >{{ hospitals }}</v-list-item-title
              >
              <v-list-item-title class="text_hover text-uppercase mt-2">
                Total Hospitals
              </v-list-item-title>
            </v-list-item-content>
          </v-card>
        </v-hover>
      </v-flex>
      <v-flex
        xs12
        sm6
        md4
        lg3
      >
        <v-hover v-slot:default="{ hover }" open-delay="10">
          <v-card
            :height="$vuetify.breakpoint.mdAndUp ? '250' : '250'"
            flat
            :elevation="hover ? 8 : 3"
            class="card_hover"
            light
          >
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-img
                class="icon_hover"
                center
                contain
                aspect-ratio="1"
                :src="donor"
              ></v-img>

              <v-spacer></v-spacer>
            </v-card-actions>
            <v-list-item-content class="text-center mt-3">
              <v-list-item-title
                class="text_hover headline font-weight-bold text-uppercase"
                >{{ donors }}</v-list-item-title
              >
              <v-list-item-title class="text_hover text-uppercase mt-2">
                Total Donors
              </v-list-item-title>
            </v-list-item-content>
          </v-card>
        </v-hover>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import doctor from '@/static/doctor.png'
import hospital from '@/static/hospital.png'
import donor from '@/static/donor.png'
export default {
  data() {
    return {
      name: 'Trusted',
      title: 'Trusted',
      secondary: '#000020',
      doctor,
      hospital,
      donor,
      hospitals: '',
      doctors: '',
      donors: '',
      services: [
        {
          service_title: ' Total Doctors ',
          number: '300',
          link: '',
          icon: doctor,
        },
        {
          service_title: 'Total Hospitals',
          number: '300',
          link: '',
          icon: hospital,
        },
        {
          service_title: ' Total Blood Donor',
          number: '2000',
          link: '',
          icon: donor,
        },
      ],
    }
  },
  created() {
    this.initIndexInfo()
  },
  methods: {
    initIndexInfo() {
      this.$axios
        .get('/indexInfo')
        .then((response) => {
          console.log(response)
          this.hospitals = response.data.hospitals
          this.doctors = response.data.doctors
          this.donors = response.data.donors
        })
    }
  }
}
</script>

<style scoped>
.card_hover:hover {
  /*transform: scale(1.05);*/
  /*-webkit-transition: all 1s ease;*/
  /*-moz-transition: all 1s ease;*/
  /*transition: all 1s ease;*/
  /*background: rgb(224 224 224);*/
}
.icon_hover {
  color: #0eae50;
}
.card_hover:hover .text_hover {
  color: #0eae50;
}
.card_hover:hover .icon_hover {
  color: #000020;
}
.card_hover:hover .details_hover {
  color: #000020;
}
.center {
  margin: auto;
  width: 70%;
  padding: 1px;
}
</style>
