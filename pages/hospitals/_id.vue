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
        <div class="mapouter mt-5">
          <div class="gmap_canvas">
            <iframe
              id="gmap_canvas"
              width="342"
              height="250"
              :src="
                'https://www.google.com/maps/embed/v1/place?key=AIzaSyAktJ_mh-R5DmhdXCGOn2vlGv4vHZ0QKf4&center=' +
                hospital.center +
                '&zoom=18&q=Bangladesh'
              "
              frameborder="0"
              scrolling="no"
              marginheight="0"
              marginwidth="0"
            ></iframe>
          </div>
        </div>
      </v-col>
      <v-col cols="12" sm="8" class="pa-0">
        <v-card
          flat
          class="mt-5"
          style="background-color: transparent; color: black"
        >
          <p style="font-size: 13px" class="pa-1">{{ hospital.details }}</p>
        </v-card>
        <v-col cols="12" sm="12">
          <v-card flat light>
            <v-tabs v-model="tab">
              <v-tab
                v-for="item in departments"
                :key="item.tab"
                class="black--text"
              >
                <v-list-item-title style="font-size: 14px">
                  {{ item.name }}
                </v-list-item-title>
              </v-tab>
            </v-tabs>
          </v-card>
          <v-card flat class="mt-3 transparent">
            <v-tabs-items v-model="tab" class="transparent">
              <v-tab-item
                v-for="(item, j) in departments"
                :key="j"
                class="layout row wrap"
              >
                <v-flex v-for="(dc, i) in doctors" :key="i" xs12 sm6 md3 lg3>
                  <v-card
                    v-if="item.id === dc.department_id"
                    class="mx-auto card_hover"
                    max-width="344"
                    outlined
                    flat
                    light
                  >
                    <v-img :src="baseURL + dc.image" height="170px"></v-img>
                    <v-list-item class="px-2">
                      <v-list-item-content>
                        <h2 class="font-weight-bold secondary--text pl-1">
                          <nuxt-link
                            to=""
                            style="text-decoration: none; font-size: 15px"
                            class="black--text text-uppercase"
                          >
                            {{ dc.name }}
                          </nuxt-link>
                        </h2>
                        <p class="expert_title pl-1">{{ dc.designation }}</p>
                        <v-rating
                          v-model="rating"
                          small
                          dense
                          readonly
                          half-increments
                          background-color="orange lighten-3"
                          color="orange"
                        ></v-rating>
                      </v-list-item-content>
                    </v-list-item>
                    <v-divider />
                    <v-card-actions class="">
                      <v-btn
                        block
                        small
                        color="teal"
                        class="white--text"
                        :to="'/doctors/' + dc.id"
                      >
                        get an appointment
                      </v-btn>
                    </v-card-actions>
                  </v-card>
                </v-flex>
              </v-tab-item>
            </v-tabs-items>
          </v-card>
        </v-col>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import Doctors from '../../components/Doctors/Doctors'

export default {
  name: 'Details',
  components: { Doctors },
  data() {
    return {
      hospital: {},
      departments: [],
      doctors: [],
      currentLocation: {},
      circleOptions: {},
      mapStyle: [],
      rating: 3,
      secondary: '#000020',
      tab: null,
      loading: false,
      tabs: [],
      clusterStyle: [
        {
          url:
            'https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m1.png',
          width: 56,
          height: 56,
          textColor: '#fff',
        },
      ],
    }
  },
  inject: {
    theme: {
      default: { isDark: false },
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
            this.hospital = response.data.hospital
            this.departments = response.data.departments
            this.doctors = response.data.doctors
            this.loading = false
          })
          .catch((error) => {
            console.error(error.message)
          })
      } catch (e) {}
    },
  },
}
</script>

<style scoped></style>
