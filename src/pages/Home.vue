<template>
  <div v-if="asyncDataStatus_ready">
    <AppHead>
      <title>Thailand Explorer</title>
      <meta
        property="og:title"
        content="Explore random destinations in Thailand"
      />
      <meta name="twitter:title" content="Thailand Explorer" />
    </AppHead>
    <div id="landingpage" class="landing-page-wrapper">
      <div class="landing-page-cta-wrapper">
        <h1 class="landing-page-headline">Thailand Explorer</h1>
        <img
          class="logo-img"
          src="https://res.cloudinary.com/dnpje4e34/image/upload/v1647989771/chang-logo_zgipn8.png"
          alt="elepant logo"
        />
        <h3 class="landing-page-subheadline">
          Explore Random Destinations In Thailand
        </h3>
        <router-link :to="{ name: 'Destination' }" class="landing-page-cta-btn">
          Find Adventure
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
import asyncDataStatus from '@/mixins/asyncDataStatus'
export default {
  mixins: [asyncDataStatus],
  methods: {
    loadRandomBg() {
      const IMG_URL = 'https://thailand-exp-images.s3-us-west-2.amazonaws.com/'
      const backgroundImages = [
        'riceLady.jpg',
        'raileyBeach.jpg',
        'monksTemple.jpg',
        'monkeys.jpg',
        'manChang.jpg',
        'maeYai.jpg',
        'girlsWater.jpg',
        'girlChang.jpg',
        'floatingMarket.jpg',
        'buddha.jpg',
        'boyBudah.jpg',
        'ancient.jpg',
        'thaiBackground.jpg',
        'Yipeng.jpg',
        'islands.jpg',
        'Loy_Krathong.jpg',
        'thaiBudah.jpg',
        'komloy.jpg'
      ]

      const randomImage =
        backgroundImages[Math.floor(Math.random() * backgroundImages.length)]
      let landingPage = document.getElementById('landingpage')
      landingPage.setAttribute(
        'style',
        'background-image: url(' + IMG_URL + randomImage + ')'
      )
    }
  },
  created() {
    this.asyncDataStatus_fetched()
  },
  mounted() {
    this.loadRandomBg()
  }
}
</script>

<style>
.landing-page-wrapper {
  display: flex;
  background: linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)),
    url('https://s3-us-west-2.amazonaws.com/s.cdpn.io/428394/monkeys.jpg');
  background-repeat: no-repeat;
  background-size: cover;
  min-height: 100vh;
  justify-content: center;
  align-items: center;
}
.landing-page-cta-wrapper {
  display: flex;
  flex-direction: column;
  justify-content: center;
  background-color: rgba(0, 0, 0, 0.33);
  padding: 2.5rem;
  border-radius: 1.5rem;
}

.landing-page-headline {
  text-align: center;
  color: #fff;
  font-size: var(--fs-700);
}

.landing-page-subheadline {
  color: #fff;
  font-size: var(--fs-600);
  margin-bottom: 1rem;
}

.logo-img {
  height: 95px;
  width: 120px;
  margin: 0 auto;
}
.landing-page-cta-btn {
  background-color: rgba(56, 152, 236, 0.6);
  text-decoration: none;
  display: inline-block;
  color: #fff;
  border-radius: 1.5rem;
  padding: 0.56rem 1rem;
  width: 10rem;
  text-align: center;
  margin: 0 auto;
}

@media screen and (max-width: 525px) {
  :root {
    --fs-xl: 5rem;
    --fs-700: 2.375rem;
    --fs-600: 1.4rem;
    --fs-500: 1.1rem;
    /* body font */
    --fs-400: 1rem;
  }
}
@media screen and (max-width: 495px) {
  :root {
    --fs-xl: 5rem;
    --fs-700: 2.375rem;
    --fs-600: 1.2rem;
    --fs-500: 1.1rem;
    /* body font */
    --fs-400: 1rem;
  }
}

@media screen and (max-width: 420px) {
  :root {
    --fs-xl: 5rem;
    --fs-700: 2.375rem;
    --fs-600: 1.7rem;
    --fs-500: 1.1rem;
    /* body font */
    --fs-400: 1rem;
  }
}

@media screen and (max-width: 355px) {
  :root {
    --fs-xl: 5rem;
    --fs-700: 2.375rem;
    --fs-600: 1.5rem;
    --fs-500: 1.1rem;
    /* body font */
    --fs-400: 1rem;
  }
}

@media screen and (max-width: 479px) {
  .landing-page-cta-wrapper {
    width: 90%;
    padding: 20px 10px;
    text-align: center;
  }
}
</style>