<template>
  <v-container grid-list-lg>
    <v-col cols="12" sm="12">
      <v-card class="transparent" flat>
        <v-tabs v-model="tab" background-color="transparent">
          <v-tab v-for="item in tabs" :key="item.tab" class="black--text">
            <v-list-item-title style="font-size: 14px">
              {{ item.tab }}
            </v-list-item-title>
          </v-tab>
        </v-tabs>
      </v-card>
      <v-card flat class="mt-3 transparent">
        <v-tabs-items v-model="tab" class="transparent">
          <v-tab-item
            v-for="item in tabs"
            :key="item.tab"
            class="layout row wrap justify-center align-center"
          >
            <v-flex
              v-for="(doctor, i) in item.doctors"
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
                <v-img :src="doctor.image" height="170px"> </v-img>
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
                    <p class="expert_title pl-1">{{ doctor.title }}</p>
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
                    to="/doctors/appointment"
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
import dc1 from '@/static/dc1.jpg'
import dc2 from '@/static/dc2.jpg'
import dc3 from '@/static/dc3.jpg'
import dc4 from '@/static/dc4.jpg'
export default {
  data() {
    return {
      name: 'Gigs',
      title: 'Gigs',
      rating: 3,
      secondary: '#000020',
      tab: null,
      tabs: [
        {
          tab: 'Orthopedics',
          cont: 3,
          doctors: [
            {
              title: 'MBBS, FCPS',
              is_read: true,
              link: '',
              name: 'Md Yusuf Bin Nur',
              image: dc1,
            },
            {
              title: 'MBBS, FCPS',
              is_read: true,
              link: '',
              name: 'Md Ismail Hossain',
              image: dc2,
            },
            {
              title: 'MBBS, FCPS',
              is_read: true,
              link: '',
              name: 'Mr Sayed',
              image: dc3,
            },
            {
              title: 'MBBS, FCPS',
              is_read: true,
              link: '',
              name: 'MRs Selina',
              image: dc4,
            },
          ],
        },
        {
          tab: 'Neurologist',
          cont: null,
          doctors: [
            {
              title: 'MBBS, FCPS',
              is_read: true,
              link: '',
              name: 'Md Yusuf Bin Nur',
              image: dc1,
            },
            {
              title: 'MBBS, FCPS',
              is_read: true,
              link: '',
              name: 'Md Ismail Hossain',
              image: dc2,
            },
            {
              title: 'MBBS, FCPS',
              is_read: true,
              link: '',
              name: 'Mr Sayed',
              image: dc3,
            },
            {
              title: 'MBBS, FCPS',
              is_read: true,
              link: '',
              name: 'MRs Selina',
              image: dc4,
            },
          ],
        },
      ],
    }
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
  color: green;
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
