<template>
  <div>
    <YoutubeVue3
      ref="youtube"
      :videoid="video_id"
      :width="640"
      :height="360"
      :controls="1"
    />
  </div>
</template>

<script>
import { YoutubeVue3 } from 'youtube-vue3'
export default {
  components: { YoutubeVue3 },
  props: {
    video_id: {
      type: String,
      default: 'Lc0IVnCLAZ8'
    }
  }
}
</script>
