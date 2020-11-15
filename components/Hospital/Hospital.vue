<template>
  <v-container grid-list-lg>
    <v-layout row wrap justify-center>
      <v-flex v-for="(hospital, i) in hospitals" :key="i" xs12 sm6 md3 lg3>
        <v-card class="mx-auto card_hover" max-width="344" outlined flat light>
          <v-hover v-slot:default="{ hover }">
            <v-img :src="baseURL + hospital.image" height="170px">
              <v-expand-transition>
                <div
                  v-if="hover"
                  class="d-flex transition-fast-in-fast-out black v-card--reveal display-1 white--text"
                  style="height: 100%"
                >
                  <v-btn
                    color="white"
                    outlined
                    class="white--text details"
                    :to="'/hospitals/' + hospital.id"
                    >Details</v-btn
                  >
                </div>
              </v-expand-transition>
            </v-img>
          </v-hover>
          <v-list-item class="px-2">
            <v-list-item-content>
              <h2
                class="font-weight-bold secondary--text pl-1"
                @click="sendToDetailsPage(hospital)"
              >
                <nuxt-link
                  to=""
                  style="text-decoration: none; font-size: 15px"
                  class="black--text text-uppercase"
                >
                  {{ hospital.name }}
                </nuxt-link>
              </h2>
              <p class="expert_title pl-1">{{ hospital.location }}</p>
              <p class="expert_title pl-1">{{ hospital.contact }}</p>
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
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>
<script>
export default {
  data() {
    return {
      name: 'Hospitals',
      title: 'Hospitals',
      rating: 3,
      secondary: '#000020',
      tab: null,
      hospitals: [],
    }
  },
  created() {
    this.getHospitalLists()
  },
  methods: {
    sendToDetailsPage(hospital) {
      this.$router.push({
        name: 'hospitals-details',
        params: {
          hospital,
        },
      })
    },
    getHospitalLists() {
      try {
        this.$axios
          .get('/hospitals')
          .then((response) => {
            this.hospitals = response.data
            this.loading = false
          })
          .catch((error) => {
            console.error(error.message)
          })
      } catch (e) {}
    },
  },
  head() {
    return {
      title: this.title,
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: 'softarray services page',
        },
      ],
    }
  },
}
</script>

<style scoped>
.card_hover:hover .title_hover {
  color: #14d470;
}

.title_hover {
  color: black;
}

.v-card--reveal {
  align-items: center;
  bottom: 0;
  justify-content: center;
  opacity: 0.8;
  position: absolute;
  width: 100%;
}

.expert_title {
  font-size: 12px;
}
</style>
