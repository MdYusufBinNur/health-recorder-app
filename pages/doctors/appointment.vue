<template>
  <v-container>
    <h1 class="black--text">Get an appointment</h1>
    <v-row>
      <v-col cols="12" sm="4">
        <v-card flat outlined light>
          <v-list-item class="px-4">
            <v-list-item-avatar
              rounded
              size="80"
              color="transparent"
              class="mr-2"
            >
              <v-img
                class="rounded-circle"
                src="https://cdn.vuetifyjs.com/images/cards/sunshine.jpg"
              ></v-img>
            </v-list-item-avatar>

            <v-list-item-content
              :class="$vuetify.breakpoint.mdAndUp ? 'ml-10' : ''"
            >
              <v-list-item-title
                v-for="(item, i) in items"
                :key="i"
                class="font-weight-bold ml-1 pa-3"
              >
                <nuxt-link
                  :to="item.link"
                  style="font-size: 14px"
                  class="blue--text text-capitalize text-decoration-none"
                >
                  {{ item.title }}
                </nuxt-link>
              </v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-card>
        <v-card flat outlined class="mt-5" light>
          <h2 class="text-center pa-3" align="center">
            What service you are looking for?
          </h2>
          <v-card-text class="text-center pa-3 black--text" align="center">
            Make a request and receive offers from qualified sellers.
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-list-item-avatar
              rounded
              size="100"
              color="transparent"
              class="mr-2"
            >
              <v-img
                class="rounded-circle text-center"
                align="center"
                src="https://cdn.vuetifyjs.com/images/cards/sunshine.jpg"
              ></v-img>
            </v-list-item-avatar>
            <v-spacer></v-spacer>
          </v-card-actions>
          <v-card-actions class="pa-5">
            <v-spacer />
            <v-btn color="primary"> Post a request </v-btn>
            <v-spacer />
          </v-card-actions>
        </v-card>
      </v-col>
      <v-col cols="12" sm="8">
        <v-card class="transparent" flat light>
          <v-tabs v-model="tab" background-color="transparent">
            <v-tab v-for="item in tabs" :key="item.tab" class="black--text">
              <v-badge
                v-if="item.cont !== null"
                color="primary"
                :content="item.cont"
                inline
              >
                {{ item.tab }}
              </v-badge>

              <v-list-item-title v-else style="font-size: 14px">
                {{ item.tab }}
              </v-list-item-title>
            </v-tab>
          </v-tabs>
        </v-card>
        <v-card flat class="mt-3" light>
          <v-tabs-items v-model="tab" light>
            <v-tab-item v-for="item in tabs" :key="item.tab">
              <v-card
                v-for="(content_title, i) in item.content"
                :key="i"
                light
                flat
                outlined
                :class="
                  !content_title.is_read ? 'mb-1 green lighten-5' : 'mb-2'
                "
              >
                <nuxt-link
                  :to="content_title.link"
                  class="text-decoration-none"
                >
                  <v-list-item>
                    <v-list-item-avatar>
                      <v-icon
                        large
                        dense
                        size="2"
                        color="light"
                        class="grey lighten-3"
                        >mdi-bell-outline</v-icon
                      >
                    </v-list-item-avatar>
                    <v-card-text color="success">{{
                      content_title.title
                    }}</v-card-text>
                  </v-list-item>
                </nuxt-link>
              </v-card>
            </v-tab-item>
          </v-tabs-items>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: 'Appointment',
  data() {
    return {
      tab: null,
      items: [
        {
          title: 'View my Favorites',
          link: '',
        },
        {
          title: 'Invite Friends',
          link: '',
        },
        {
          title: 'Start Selling',
          link: '',
        },
      ],
      tabs: [
        {
          tab: 'Notifications',
          cont: 3,
          content: [
            {
              title:
                'Get 20% off your first order! Use promo code: FIVERRGROW20. This offer ends today!',
              is_read: true,
              link: '',
            },
            {
              title:
                'Get 20% off your first order! Use promo code: FIVERRGROW20. This offer ends today!Get 20% off your first order! Use promo code: FIVERRGROW20. This offer ends today!',
              is_read: true,
              link: '',
            },
            {
              title:
                'Get 20% off your first order! Use promo code: FIVERRGROW20. This offer ends today!',
              is_read: false,
              link: '',
            },
            {
              title:
                'Get 20% off your first order! Use promo code: FIVERRGROW20. This offer ends today!',
              is_read: true,
              link: '',
            },
          ],
        },
        {
          tab: 'Todos',
          cont: null,
          content: [
            {
              title:
                'Get 20% off your first order! Use promo code: FIVERRGROW20. This offer ends today!',
              is_read: true,
              link: '',
            },
            {
              title:
                'Get 20% off your first order! Use promo code: FIVERRGROW20. This offer ends today!Get 20% off your first order! Use promo code: FIVERRGROW20. This offer ends today!',
              is_read: true,
              link: '',
            },
            {
              title:
                'Get 20% off your first order! Use promo code: FIVERRGROW20. This offer ends today!',
              is_read: false,
              link: '',
            },
            {
              title:
                'Get 20% off your first order! Use promo code: FIVERRGROW20. This offer ends today!',
              is_read: true,
              link: '',
            },
          ],
        },
      ],
    }
  },
}
</script>

<style scoped></style>
