<template>
  <div v-if="asyncDataStatus_ready" class="container">
    <DestinationNav />
    <main>
      <div class="destination-map-wrapper">
        <h2 class="destination-title">Explore {{ locationTitle }}</h2>
        <GoogleMap :lat="lat" :lng="lng" />
      </div>
      <div class="destination-center-content">
        <div class="pegman-wrapper">
          <img
            src="https://res.cloudinary.com/dch4i7gjv/image/upload/v1648164955/pegman-gif_tepdwj.gif"
            alt="pegman"
            class="pegman-img"
          />
          <h3 class="pegman-heading">
            Drag me out from corner of map to see cool stuff
          </h3>
        </div>
        <div class="accomodation-img-wrapper">
          <a :href="bookingLink" target="_blank" class="accomodation-link">
            Local Accomodations <br />
            From Booking.com</a
          >
        </div>
      </div>
      <div class="video-section">
        <div class="video-wrapper">
          <YouTube :video_id="vidId" />
        </div>
      </div>
      <div class="destination-bottom-content-wrapper">
        <div class="destination-img-wrapper">
          <img
            :src="locationImgUrl"
            alt="destination image"
            class="destination-img"
          />
        </div>
        <div class="destination-text-content">
          {{ locationDescription }}
          <a
            id="readMorelink"
            class="moreLink"
            target="_blank"
            :href="`https://en.wikivoyage.org/wiki/` + `${locationTitle}`"
            >More information about {{ locationTitle }} from WikiVoyage
            &hellip;</a
          >
        </div>
      </div>
      <div class="policies-wrapper">
        <a href="https://www.youtube.com/t/terms" class="policy-link"
          >YouTube terms of service</a
        >
        <a
          href="https://policies.google.com/privacy?hl=en-US"
          class="policy-link"
          >Google privacy policy</a
        >
      </div>
    </main>
  </div>
</template>

<script>
import data from '@/locations.json'
import axios from 'axios'
import asyncDataStatus from '@/mixins/asyncDataStatus'
import GoogleMap from '@/components/GoogleMap'
import DestinationNav from '@/components/DestinationNav'
import YouTube from '@/components/YouTube'
import BookingLinks from '@/booking-links.json'
export default {
  components: { GoogleMap, DestinationNav, YouTube },
  mixins: [asyncDataStatus],
  data() {
    return {
      pickedLocation: {},
      locationTitle: '',
      locationImgUrl: '',
      locationDescription: '',
      moreInfoLink: '',
      lat: '',
      lng: '',
      vidId: '',
      apiKey: process.env.VUE_APP_API_KEY,
      bookingLink: ''
    }
  },
  methods: {
    getLocationData() {
      const locations = data.items
      const random = Math.floor(Math.random() * locations.length)
      const randomLocation = locations[random]
      this.pickedLocation = randomLocation
      this.lat = randomLocation.lat
      this.lng = randomLocation.lng
      this.locationTitle = this.pickedLocation.name
    },
    async getYouTubeVideoId(location) {
      try {
        const response = await axios.get(
          `https://www.googleapis.com/youtube/v3/search?key=${this.apiKey}&type=video&part=snippet&maxResults=1&q=${location}`
        )
        if (response.data) {
          this.vidId = response.data.items[0].id.videoId
        }
      } catch (error) {
        console.log({ error })
      }
    },
    async getWikiData(location) {
      try {
        const response = await axios.get(
          `https://en.wikivoyage.org/w/api.php?origin=*&action=query&format=json&prop=pageimages%7Cextracts&exlimit=1&generator=prefixsearch&redirects=1&formatversion=2&piprop=thumbnail&pithumbsize=250&pilimit=20&gpssearch=${location}&gpslimit=1`
        )
        const wikiData = response.data
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
      const parser = new DOMParser()
      const doc = parser.parseFromString(data, 'text/html')

      const text = doc.getElementsByTagName('p')
      const descriptionText =
        text[0].innerText + text[1].innerText.substring(0, 200)

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
    },
    getBookingLink(locationName) {
      const bookingObj = BookingLinks.find(
        (item) => item.Cities === locationName
      )
      this.bookingLink = bookingObj.URL
      console.log(bookingObj.URL)
      return bookingObj
    }
  },
  async created() {
    this.getLocationData()
    await this.getWikiData(this.pickedLocation.name)
    await this.getYouTubeVideoId(this.pickedLocation.name)
    this.asyncDataStatus_fetched()
    this.getBookingLink(this.pickedLocation.name)
  }
}
</script>

<style>
.destination-title {
  text-align: center;
  color: var(--headline-clr);
  margin-bottom: 0.8rem;
}

.destination-map-wrapper {
  padding: 2rem;
  margin-top: 2rem;
  margin-bottom: 5.312rem;
  box-shadow: 1px 1px 3px 0 rgb(55 64 71 / 66%);
}

.destination-center-content {
  display: flex;
  justify-content: space-around;
  margin-bottom: 5.312rem;
}
.pegman-wrapper {
  display: flex;
  align-items: center;
  padding: 1rem;
  height: 292px;
  max-width: 45%;
  box-shadow: 1px 1px 3px 0 rgb(55 64 71 / 66%);
}

.pegman-text-content {
  display: flex;
  flex-direction: column;
}

.pegman-heading {
  margin-left: 0.5rem;
}

.destination-text-content {
  box-shadow: 1px 1px 3px 0 rgb(55 64 71 / 66%);
  background-color: #fff;
  max-width: 530px;
  padding: 1.8rem;
}

.destination-bottom-content-wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 5.312rem;
}
.destination-img-wrapper {
  height: 250px;
  width: 250px;
  margin-right: 2rem;
  box-shadow: 1px 1px 3px 0 rgb(55 64 71 / 66%);
}
.destination-img {
  width: 100%;
  height: 100%;
}
.policies-wrapper {
  display: flex;
  justify-content: space-between;
  padding: 2rem;
}

.pegman-img {
  margin-right: 2rem;
  height: 180px;
}

.moreLink {
  margin-top: 10px;
}

.accomodation-img-wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 292px;
  width: 450px;
  max-width: 45%;
  margin-bottom: 3rem;
  background-image: linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)),
    url('../assets/images/thairesort-450.svg');
  background-repeat: no-repeat;
  background-size: cover;
}

.accomodation-link {
  color: white;
  font-size: 1.5rem;
  text-align: center;
  cursor: pointer;
}

.video-section {
  width: 90%;
  margin-left: auto;
  margin-right: auto;
  margin-bottom: 5.312rem;
}
@media screen and (max-width: 768px) {
  .destination-center-content {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  .conatiner {
    max-width: 100vw;
  }
  .pegman-wrapper {
    max-width: 95%;
    margin-bottom: 2rem;
  }

  .accomodation-img-wrapper {
    max-width: 95%;
  }

  .destination-bottom-content-wrapper {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .destination-img-wrapper {
    margin-bottom: 5.312rem;
  }
  .destination-img-wrapper {
    margin: 0 0 2rem;
  }
}

@media screen and (max-width: 600px) {
  .destination-pegman-wrapper {
    flex-direction: column;
  }

  .pegman-img {
    margin: 0 0 1rem;
  }
}
</style>
