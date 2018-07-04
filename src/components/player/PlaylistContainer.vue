<template>
  <div class="playlist-container">
    <ul class="playlist-song-list">
      <li class="playlist-song"
      v-for="(item, index) in items" :key="index"
      :class="{selected: selectedSong == index}"
      @click="selectedSong = index">
        <i class="icon song">S</i>
        <span>{{ item }}</span>
      </li>
    </ul>
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  props: {
    items: {}
  },

  data() {
    return {
      selectedSong: undefined
    }
  }
};
</script>

<style scoped lang="scss">
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
