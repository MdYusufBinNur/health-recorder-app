<template>
  <v-container grid-list-lg :class="details ? 'pa-0' : ''">
    <v-col v-if="details" cols="12" sm="12" :class="hospital ? 'pa-0' : ''">
      <v-card class="transparent" flat>
        <v-tabs v-model="tab" background-color="transparent">
          <v-tab
            v-for="item in hospital.department"
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
            v-for="(item, j) in hospital.department"
            :key="j"
            class="layout row wrap"
          >
            <v-flex v-for="(dc, i) in item.doctor" :key="i" xs12 sm6 md3 lg3>
              <v-card
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
    <v-col v-if="!details" cols="12" sm="12" :class="hospital ? 'pa-0' : ''">
      <v-card class="transparent" flat>
        <v-tabs v-model="tab" background-color="transparent">
          <v-tab v-for="(item, i) in tabs" :key="i" class="black--text">
            <v-list-item-title style="font-size: 14px">
              {{ item.name }}
            </v-list-item-title>
          </v-tab>
        </v-tabs>
      </v-card>
      <v-card flat class="mt-3 transparent">
        <v-tabs-items v-model="tab" class="transparent">
          <v-tab-item
            v-for="(item, i) in tabs"
            :key="i"
            class="layout row wrap"
          >
            <v-flex
              v-for="(doctor, i) in item.doctor"
              :key="i"
              xs12
              sm6
              md3
              lg3
            >
              <v-card
                class="mx-auto card_hover"
                max-width="344"
                outlined
                flat
                light
              >
                <v-img :src="baseURL + doctor.image" height="170px"></v-img>
                <v-list-item class="px-2">
                  <v-list-item-content>
                    <h2 class="font-weight-bold secondary--text pl-1">
                      <nuxt-link
                        to=""
                        style="text-decoration: none; font-size: 15px"
                        class="black--text text-uppercase"
                      >
                        {{ doctor.name }}
                      </nuxt-link>
                    </h2>
                    <p class="expert_title pl-1">{{ doctor.designation }}</p>
                    <v-rating
                      :v-model="doctor.rating"
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
                    :to="'/doctors/' + doctor.id"
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
  </v-container>
</template>
<script>
export default {
  // eslint-disable-next-line vue/require-prop-types
  props: ['hospital', 'details'],
  data() {
    return {
      name: 'Doctors',
      title: 'Doctors',
      rating: 3,
      secondary: '#000020',
      tab: null,
      loading: false,
      tabs: [],
    }
  },
  created() {
    this.getDoctorLists()
  },
  methods: {
    sendToDetailsPage(expert) {
      this.$router.push({
        name: 'experts-details',
        params: {
          expert,
        },
      })
    },
    getDoctorLists() {
      try {
        this.$axios
          .get('/doctors')
          .then((response) => {
            this.tabs = response.data
          })
          .finally()
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
          content: '',
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
