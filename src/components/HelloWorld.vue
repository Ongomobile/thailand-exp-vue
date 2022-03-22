/* eslint-disable vue/no-parsing-error */
<template>
  <div>
    <GoogleMap :lat="18.706064" :lng="98.981716" />
    <YouTube :video_id="`3PURmk26DEE`" />
  </div>
</template>

<script>
import GoogleMap from "@/components/GoogleMap";
import YouTube from "@/components/YouTube";
export default {
  components: {
    GoogleMap,
    YouTube,
  },
};
</script>

<style>
</style>