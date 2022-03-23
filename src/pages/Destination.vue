<template>
  <h1>Destination Page</h1>
</template>

<script>
import data from '@/locations.json'
export default {
  data() {
    return {
      pickedLocation: {}
    }
  },
  methods: {
    getLocationData() {
      const locations = data.items
      const random = Math.floor(Math.random() * locations.length)
      let randomLocation = locations[random]
      this.pickedLocation = randomLocation

      console.log(this.pickedLocation)
    },
    async getWikiData(location) {
      try {
        this.axios
          .get(
            `https://en.wikivoyage.org/w/api.php?action=query&format=json&prop=pageimages%7Cextracts&exlimit=1&generator=prefixsearch&redirects=1&formatversion=2&piprop=thumbnail&pithumbsize=250&pilimit=20&gpssearch=${location}&gpslimit=1`
          )
          .then((response) => {
            console.log(response.data)
          })
      } catch (error) {
        console.log({ error })
      }
    }
  },
  mounted() {
    this.getLocationData()
    this.getWikiData(this.pickedLocation.name)
  }
}
</script>

<style>
</style>