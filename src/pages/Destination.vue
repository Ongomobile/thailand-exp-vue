<template>
  <h1>Destination Page</h1>
  <img :src="locationImgUrl" alt="" />
</template>

<script>
import data from '@/locations.json'
import axios from 'axios'
export default {
  data() {
    return {
      pickedLocation: {},
      locationTitle: '',
      locationImgUrl: null,
      locationDescription: '',
      moreInfoLink: ''
    }
  },
  methods: {
    getLocationData() {
      const locations = data.items
      const random = Math.floor(Math.random() * locations.length)
      let randomLocation = locations[random]
      this.pickedLocation = randomLocation
      this.locationTitle = this.pickedLocation.name
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
      console.log(this.locationImgUrl)
    }
  },
  created() {
    this.getLocationData()
    this.getWikiData(this.pickedLocation.name)
  }
}
</script>

<style>
img {
  height: 250px;
  width: 250px;
}
</style>