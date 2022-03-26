<template>
  <Head>
    <title>Thailand Explorer</title>
    <meta
      name="description"
      content="Explore cool random destinations in Thailand,places you never thought about visiting"
    />

    <!-- Social -->
    <meta property="og:title" content="Thailand Explorer" />
    <meta
      property="og:description"
      content="Explore cool random destinations in Thailand"
    />
    <meta
      property="og:image"
      content="https://vueschool.io/media/f007f6057444d9a7f567163391d2b366/vuejs-3-master-class-not-transparent.jpg"
    />

    <!-- Twitter -->
    <meta name="twitter:title" content="Thailand Explorer" />
    <meta
      name="twitter:description"
      content="Explore cool random destinations in Thailand"
    />
    <meta
      name="twitter:image"
      content="https://vueschool.io/media/f007f6057444d9a7f567163391d2b366/vuejs-3-master-class-not-transparent.jpg"
    />
    <meta name="twitter:card" content="summary_large_image" />
  </Head>
  <!-- why -->
  <div class="conatiner">
    <router-view
      v-show="showPage"
      @ready="onPageReady"
      :key="$route.fullPath"
    />
    <AppSpinner v-show="!showPage" />
  </div>
</template>

<script>
import { Head } from '@vueuse/head'
export default {
  name: 'App',
  components: { Head },
  data() {
    return {
      showPage: false
    }
  },
  methods: {
    onPageReady() {
      this.showPage = true
    }
  },
  created() {
    this.$router.beforeEach(() => {
      this.showPage = false
    })
  }
}
</script>

<style>
@import 'assets/style.css';
</style>
