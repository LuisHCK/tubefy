<template>
  <div class="playlist-container">
    <ul class="playlist-song-list">
      <li class="playlist-song"
        v-for="(item, index) in items" :key="index"
        :class="{selected: currentVideoId == item.videoId}"
        @click="selectSong(item)">

        <span class="icon has-text-info">
          <i class="icon ion-md-play" v-if="currentVideoId == item.videoId"></i>
          <i class="icon ion-md-musical-notes" v-else></i>
        </span>
        <span>{{ item.title }}</span>
      </li>
    </ul>
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  computed: mapState({
    currentVideoId: state => state.currentVideoId
  }),

  props: {
    items: {}
  },

  methods: {
    selectSong(song) {
      // Set song Id
      this.$store.commit('setCurrentVideoId', song.videoId);
      // Set song object
      this.$store.commit('setCurrentSongInfo', song)
      this.setQueue()
    },

    setQueue() {
      // Get only video ids
      let videoIds = []
      this.items.map(item => {
        videoIds.push(item.videoId)
      })
      // Set queue
      this.$store.commit('setQueue', videoIds)
    }
  }
};
</script>

<style scoped lang="scss">
.playlist-container {
  overflow-y: scroll;
  height: 60vh;
}
.playlist-song-list {
  li.playlist-song {
    padding: 10px;
    cursor: pointer;
  }
  li.playlist-song.selected {
    background-color: #f3f3f3;
  }
  li.playlist-song:hover {
    background-color: #f3f3f3;
  }
}
</style>
