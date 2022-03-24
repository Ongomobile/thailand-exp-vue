<template>
  <div class="col-full text-center">
    <h1>Not Found</h1>
    <router-link :to="{ name: 'Home' }">Start A New Adventure</router-link>
  </div>
</template>

<script>
export default {
  created() {
    this.$emit('ready')
  }
}
</script>

<style>
</style>
