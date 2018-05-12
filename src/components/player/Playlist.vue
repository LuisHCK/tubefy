<template>
  <div class="playlist-component">
    <h2 class="is-size-2">Playlists</h2>
    <br>
    <div class="columns is-mobile">
      <div class="column is-one-quarter-mobile playlists">
        <ul>
          <li v-for="(playlist, index) in playlists" :key="'pl_'+index">
            <a @click="selectCurrentPlaylist(playlist)" class="navbar-item">{{playlist.title}}</a>
          </li>
        </ul>
      </div>
      <div class="column">
        <ul>
          <li v-for="(song, index) in currentPlaylist.songs" :key="'song_'+index">
            <a @click="playSong(song, index)" class="navbar-item">{{song.title}}</a>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  computed: mapState({
    playlists: state => state.playlists,
    currentPlaylist: state => state.currentPlaylist,
    currentSong: state => state.currentSong
  }),

  methods: {
    playSong(song, index) {
      this.$store.commit('playSong', song)
      this.$store.commit('setCurrentSongIndex', index)
    },

    selectCurrentPlaylist(playlist) {
      this.$store.commit('setCurrentPlaylist', playlist)
    }
  },

  mounted() {}
}
</script>

<style scoped>
.column.playlists {
  background-color: rgb(238, 238, 238);
}
</style>
