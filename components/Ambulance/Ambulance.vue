<template>
  <v-container>
    <v-row no-gutters>
      <v-col cols="12" sm="12" md="4" v-for="(amb, i) in ambulances" :key="i">
        <v-card
          class="mx-auto"
          max-width="344"
          light
          flat
        >
          <v-list-item three-line>
            <v-list-item-content>
              <div class="overline mb-4 font-weight-bold">
                {{ amb.ambulance_no}}
              </div>
              <v-list-item-title class="headline mb-1">
                {{ amb.name}}
              </v-list-item-title>
              <v-list-item-subtitle>
                {{ amb.area}}
              </v-list-item-subtitle>
              <v-list-item-subtitle>
                {{ amb.district}}
              </v-list-item-subtitle>
              <v-list-item-subtitle>
                {{ amb.mobile}}
              </v-list-item-subtitle>
            </v-list-item-content>
            <v-img :src="baseURL + amb.image" contain aspect-ratio="1" />
          </v-list-item>
        </v-card>
      </v-col>
    </v-row>

  </v-container>
</template>

<script>
  export default {
    name: "Ambulance",
    data () {
      return {
        ambulances: [],
        loading: true
      }
    },
    created() {
      this.initAmbulance()
    },
    methods: {
      initAmbulance() {
        return this.$axios
        .get('/ambulances')
        .then((response) => {
          this.ambulances = response.data
        })
        .catch((error) => {})
        .finally(() => {
          this.loading = false
        })
      }
    }
  }
</script>

<style scoped>

</style>
