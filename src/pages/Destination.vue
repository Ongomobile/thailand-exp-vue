<template>
  <h1>Destination Page</h1>
</template>

<script>
export default {
  methods: {
    getLocationData() {
      try {
        this.axios
          .get(
            'https://raw.githubusercontent.com/Ongomobile/thailand-explorer/master/public/locations.json'
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
  }
}
</script>

<style>
</style>