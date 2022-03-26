<template>
  <AppHead>
    <title>Vue.js 3 Master Class Forum</title>
    <meta name="description" content="An awesome Vue.js 3 powered forum!" />

    <!-- Social -->
    <meta property="og:title" content="Vue.js 3 Master Class Forum" />
    <meta
      property="og:description"
      content="An Awesome Vue.js 3 powered forum!"
    />
    <meta
      property="og:image"
      content="https://vueschool.io/media/f007f6057444d9a7f567163391d2b366/vuejs-3-master-class-not-transparent.jpg"
    />

    <!-- Twitter -->
    <meta name="twitter:title" content="Vue.js 3 Master Class Forum" />
    <meta
      name="twitter:description"
      content="An Awesome Vue.js 3 powered forum!"
    />
    <meta
      name="twitter:image"
      content="https://vueschool.io/media/f007f6057444d9a7f567163391d2b366/vuejs-3-master-class-not-transparent.jpg"
    />
    <meta name="twitter:card" content="summary_large_image" />
  </AppHead>
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
export default {
  name: 'App',
  components: {},
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
