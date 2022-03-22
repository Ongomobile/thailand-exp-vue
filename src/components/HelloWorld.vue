<template>
  <GoogleMap
    api-key="AIzaSyAiiVKqAveppqhACuLuiEC1mYJIP93t6Mw"
    style="width: 100%; height: 50vh"
    :center="center"
    :zoom="15"
  >
    <Marker :options="{ position: center }" />
  </GoogleMap>
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
import { defineComponent } from "vue";
import { GoogleMap, Marker } from "vue3-google-map";
import { YoutubeVue3 } from "youtube-vue3";

export default defineComponent({
  components: { GoogleMap, Marker, YoutubeVue3 },
  setup() {
    const center = { lat: 14.99433, lng: 103.1039 };
    return { center };
  },
  data() {
    return {
      video_id: "3P1CnWI62Ik",
    };
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
});
</script>

<style scoped>
select {
  width: 200px;
  margin-top: 20px;
  margin-left: 10px;
}
</style>
