<template>
  <v-container>
    <h1 class="black--text text-uppercase text-center mb-2">
      About This Hospital
    </h1>
    <v-row>
      <v-col cols="12" sm="4">
        <v-card max-width="344" outlined flat light>
          <v-img :src="baseURL + hospital.image" height="170px"></v-img>
          <v-list-item class="px-2">
            <v-list-item-content>
              <v-list-item-title class="font-weight-bold pl-1">
                {{ hospital.name }}
              </v-list-item-title>
              <p class="expert_title pl-1">{{ hospital.address }}</p>
              <p class="expert_title pl-1">{{ hospital.contact }}</p>
              <v-rating
                v-model="hospital.rating"
                small
                dense
                readonly
                half-increments
                background-color="orange lighten-3"
                color="orange"
              ></v-rating>
            </v-list-item-content>
          </v-list-item>
        </v-card>
        <v-card flat light outlined class="mt-5" max-width="344">
          <h3 class="pa-1">About {{ hospital.name }}</h3>
          <v-divider/>
          <p style="font-size: 13px" class="pa-1">{{ hospital.details }}</p>
        </v-card>
        <div class="mapouter mt-5">
          <div class="gmap_canvas">

            <iframe width="342" height="250" id="gmap_canvas"
                    :src="'https://www.google.com/maps/embed/v1/place?key=AIzaSyAktJ_mh-R5DmhdXCGOn2vlGv4vHZ0QKf4&center='+hospital.center+'&zoom=18&q=Bangladesh'"
                    frameborder="0" scrolling="no" marginheight="0" marginwidth="0"></iframe>
          </div>
        </div>
      </v-col>
      <v-col cols="12" sm="8" class="pa-0">
        <Doctors ref="doctor_details" :hospital="hospital" :details="true"/>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
  import Doctors from '../../components/Doctors/Doctors'

  export default {
    name: 'Details',
    components: {Doctors},
    data() {
      return {
        hospital: {},
        currentLocation: {},
        circleOptions: {},
        mapStyle: [],
        clusterStyle: [
          {
            url: "https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m1.png",
            width: 56,
            height: 56,
            textColor: "#fff"
          }
        ]
      }
    },
    inject: {
      theme: {
        default: {isDark: false},
      },
    },
    created() {
      this.getHospitalDetails()
    },
    methods: {
      getHospitalDetails() {
        try {
          this.$axios
            .get('/hospital/' + this.$route.params.id)
            .then((response) => {
              this.hospital = response.data
              this.loading = false
            })
            .catch((error) => {
              console.error(error.message)
            })
        } catch (e) {
        }
      },
    },
  }
</script>

<style scoped></style>
