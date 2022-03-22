<template>
  <div>
    <div>
      <button @click="playCurrentVideo">Play</button>
      <button @click="stopCurrentVideo">Stop</button>
      <button @click="pauseCurrentVideo">Pause</button>
    </div>
    <YoutubeVue3
      ref="youtube"
      :videoid="video_id"
      :width="480"
      :height="320"
      @ended="onEnded"
      @paused="onPaused"
      @played="onPlayed"
    />
  </div>
</template>

<script>
import { YoutubeVue3 } from "youtube-vue3";
export default {
  components: { YoutubeVue3 },
  props: {
    video_id: {
      type: String,
      default: "vNQR3ixE8AE",
    },
  },
  methods: {
    playCurrentVideo() {
      this.$refs.youtube.player.playVideo();
    },
    stopCurrentVideo() {
      this.$refs.youtube.player.stopVideo();
    },
    pauseCurrentVideo() {
      this.$refs.youtube.player.pauseVideo();
    },
    onEnded() {
      console.log("## OnEnded");
    },
    onPaused() {
      console.log("## OnPaused");
    },
    onPlayed() {
      console.log("## OnPlayed");
    },
  },
};
</script>

<style>
</style>