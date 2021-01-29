<template>
  <v-container>
    <v-row>
      <h1 class="black--text px-3">Donor List</h1>
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
            :items="donors"
            :search="search"
            :loading="loading"
            loading-text="Please Wait..Loading..."
          >
          </v-data-table>
        </v-card>
      </v-col>
    </v-row>
  </v-container>

</template>

<script>
  export default {
    name: "index",
    data() {
      return {
        donors: [],
        loading: false,
        search: '',
        pause: false,
        headers: [
          {
            text: 'Donor',
            align: 'start',
            value: 'name',
          },
          {
            text: 'Mobile',
            value: 'mobile',
          },
          {
            text: 'Blood',
            value: 'blood_group',
          },
          {
            text: 'Area',
            value: 'area',
          },
          {
            text: 'District',
            value: 'district',
          }
        ],
      }
    },
    created() {
      this.initDonors()
    },
    methods: {
      initDonors() {
        return this.$axios
        .get('/donors')
        .then((response) => {
          this.donors = response.data
        })
        .catch((error) => {})
        .finally((response) => {
          this.loading = false
        })
      }
    }
  }
</script>

<style scoped>

</style>
