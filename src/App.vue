<template>
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
