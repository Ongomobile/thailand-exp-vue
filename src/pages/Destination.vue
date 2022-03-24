<template>
  <div v-if="asyncDataStatus_ready" class="container">
    <DestinationNav />
    <div class="destination-map-wrapper">
      <h2 class="destination-title">Explore {{ locationTitle }}</h2>
      <GoogleMap :lat="lat" :lng="lng" />
    </div>
    <div class="destination-video-wrapper">
      <YouTube />
    </div>
    <img :src="locationImgUrl" alt="" />
  </div>
</template>

<script>
import data from '@/locations.json'
import axios from 'axios'
import asyncDataStatus from '@/mixins/asyncDataStatus'
import GoogleMap from '@/components/GoogleMap'
import DestinationNav from '@/components/DestinationNav'
import YouTube from '@/components/YouTube'
export default {
  components: { GoogleMap, DestinationNav, YouTube },
  mixins: [asyncDataStatus],
  data() {
    return {
      pickedLocation: {},
      locationTitle: '',
      locationImgUrl: null,
      locationDescription: '',
      moreInfoLink: '',
      lat: '',
      lng: ''
    }
  },
  methods: {
    getLocationData() {
      const locations = data.items
      const random = Math.floor(Math.random() * locations.length)
      let randomLocation = locations[random]
      this.pickedLocation = randomLocation
      this.lat = randomLocation.lat
      this.lng = randomLocation.lng
      this.locationTitle = this.pickedLocation.name
    },
    async getYouTubeVideoId() {
      try {
        const response = await axios.get(
          `https://developers.google.com/apis-explorer/#p/youtube/v3/youtube.search.list?part=snippet&q=${location}`
        )
        console.log(response.data)
      } catch (error) {
        console.log({ error })
      }
    },
    async getWikiData(location) {
      try {
        const response = await axios.get(
          `https://en.wikivoyage.org/w/api.php?origin=*&action=query&format=json&prop=pageimages%7Cextracts&exlimit=1&generator=prefixsearch&redirects=1&formatversion=2&piprop=thumbnail&pithumbsize=250&pilimit=20&gpssearch=${location}&gpslimit=1`
        )
        let wikiData = response.data
        if (wikiData) {
          this.setThumbnailImg(wikiData)
        }
        const htmlString = response.data.query.pages[0].extract
        this.getDescriptionText(htmlString)
      } catch (error) {
        console.log({ error })
      }
    },
    getDescriptionText(data) {
      let parser = new DOMParser()
      const doc = parser.parseFromString(data, 'text/html')

      const text = doc.getElementsByTagName('p')
      const descriptionText =
        text[0].innerText + text[1].innerText.substring(0, 320)

      const formattedDescription = (this.locationDescription =
        this.formatDescriptionText(descriptionText) + '...')
      return formattedDescription
    },
    formatDescriptionText(str) {
      const lastIndexOfSpace = str.lastIndexOf(' ')

      if (lastIndexOfSpace === -1) {
        return str
      }
      return str.substring(0, lastIndexOfSpace)
    },
    setThumbnailImg(data) {
      // eslint-disable-next-line no-unused-vars
      const imageUrl = data.query.pages.map((item, index) => {
        // eslint-disable-next-line no-prototype-builtins
        return item.hasOwnProperty('thumbnail')
          ? item.thumbnail.source
          : 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/428394/chang.png'
      })
      this.locationImgUrl = imageUrl[0]
    }
  },
  async created() {
    this.getLocationData()
    await this.getWikiData(this.pickedLocation.name)
    await this.getYouTubeVideoId()
    this.asyncDataStatus_fetched()
  }
}
</script>

<style>
.destination-title {
  text-align: center;
  color: var(--headline-clr);
  margin-bottom: 0.8rem;
}
img {
  height: 250px;
  width: 250px;
}
</style>