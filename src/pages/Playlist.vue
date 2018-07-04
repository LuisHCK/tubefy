<template>
  <div class="playlist-page">
    <h1 class="title is-1">Playlist</h1>
    <div>
      <PlaylistContainer :items="playlist.songs"/>
    </div>
  </div>
</template>

<script>
import PlaylistContainer from '../components/player/PlaylistContainer'
import { mapState } from 'vuex'

export default {
  computed: mapState({
    playlists: state => state.playlists
  }),

  components: {
    PlaylistContainer: PlaylistContainer
  },

  data() {
    return {
      playlist: {}
    }
  },

  methods: {
    getPlaylist(id) {
      this.playlists.map(playlist => {
        if (playlist.id == id) this.playlist = playlist
      })
    }
  },

  mounted() {
    const id = this.$route.params.id
    if (id) {
      this.getPlaylist(id)
    }
  }
};
</script>

<style>
</style>
