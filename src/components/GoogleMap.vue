<template>
  <GoogleMap
    :api-key="apiKey"
    style="width: 100%; height: 50vh"
    :center="center"
    :zoom="15"
  >
    <Marker :options="{ position: center }" />
  </GoogleMap>
</template>

<script>
import { defineComponent } from 'vue'
import { GoogleMap, Marker } from 'vue3-google-map'
export default defineComponent({
  components: { GoogleMap, Marker },
  props: {
    lat: { type: Number, default: 14.99433 },
    lng: { type: Number, default: 103.1039 }
  },
  data() {
    return {
      apiKey: process.env.VUE_APP_API_KEY
    }
  },
  setup(props) {
    const center = { lat: props.lat, lng: props.lng }

    return { center }
  }
})
</script>

<style>
</style>
