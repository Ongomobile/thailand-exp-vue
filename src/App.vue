<template>
  <AppHead>
    <title>Thailand Explorer</title>
    <meta
      name="description"
      content="Explore cool random destinations in Thailand"
    />

    <!-- Social -->
    <meta property="og:title" content="Thailand Explorer" />
    <meta
      property="og:description"
      content="Find new places to explore in the land of smiles"
    />
    <meta
      property="og:image"
      content="https://res.cloudinary.com/dch4i7gjv/image/upload/v1648084976/thai-exp-og_defbfp.jpg"
    />

    <!-- Twitter -->
    <meta name="twitter:title" content="Thailand Explorer" />
    <meta
      name="twitter:description"
      content="Find new places to explore in the land of smiles"
    />
    <meta
      name="twitter:image"
      content="https://res.cloudinary.com/dch4i7gjv/image/upload/v1648084976/thai-exp-og_defbfp.jpg"
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
