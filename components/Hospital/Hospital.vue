<template>
  <v-container grid-list-lg>
    <v-layout row wrap justify-center>
      <v-flex v-for="(hospital, i) in hospitals" :key="i" xs12 sm6 md3 lg3>
        <v-card class="mx-auto card_hover" max-width="344" outlined flat light>
          <v-hover v-slot:default="{ hover }">
            <v-img :src="hospital.image" height="170px">
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
                    @click="sendToDetailsPage(hospital)"
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
import dc1 from '@/static/dc1.jpg'
import dc2 from '@/static/dc2.jpg'
import dc3 from '@/static/dc3.jpg'
import dc4 from '@/static/dc4.jpg'
import cmch from '@/static/hospitals/cmch.jpg'
import dmc from '@/static/hospitals/dmc.jpg'
import chvr from '@/static/hospitals/cvrh.jpg'
import applo from '@/static/hospitals/applo.jpg'
import beh from '@/static/hospitals/beh.jpg'

export default {
  data() {
    return {
      name: 'Hospitals',
      title: 'Hospitals',
      rating: 3,
      secondary: '#000020',
      tab: null,
      cmch,
      applo,
      chvr,
      dmc,
      beh,
      hospitals: [
        {
          name: 'Chittagong Medical College',
          location: 'Chittagong',
          contact: '+8801815111111',
          image: cmch,
          dept: {
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
        },
        {
          name: 'DhakaMedical College Hospital',
          location: 'Dhaka',
          contact: '+8801815111111',
          image: dmc,
          dept: {
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
        },
        {
          name: 'Chevron',
          location: 'Chittagong',
          contact: '+8801815111111',
          image: chvr,
          dept: {
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
        },
        {
          name: 'Applo',
          location: 'Chittagong',
          contact: '+8801815111111',
          image: applo,
          dept: {
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
        },
      ],
    }
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
