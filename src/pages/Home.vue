<template>
  <div class="home-page">
    <h1 class="title is-1">Library</h1>

    <div class="columns is-mobile is-multiline playlists-container">
      <div class="column is-2-desktop is-4-tablet is-half-mobile" v-for="(item, index) in playlists" :key="index">
        <PlaylistItem :title="item.title || 'Hello world'" :id="item.id"/>
      </div>
    </div>
  </div>
</template>

<script>
import PlaylistItem from '../components/player/PlaylistItem.vue'
import Youtube from '../youtube/'
import db from '../database/'
import { mapState } from 'vuex'

const youtube = new Youtube()

export default {
  components: {
    PlaylistItem: PlaylistItem
  },

  computed: mapState({
    playlists: state => state.playlists,
  }),

  data() {
    return {
      playlistId: '',
      playlistTitle: 'Youtube playlist',
      showForm: false
    }
  },

  methods: {
    /**
     * Call the fuction in Youtub class and retrieve all songs
     * then stores in indexedDB and updates Vuex state
    */
    createPlaylist() {
      youtube.getPlaylistItems(
        this.parseYoutubePlaylist(this.playlistId),
        undefined,
        this.playlistTitle
      )
    },

    /**
     * Get all playlist form local database and
     * tries to update Vuex store
     */
    getPlaylistsInDB() {
      db.playlists
        .toArray()
        .then(response => {
          this.$store.commit('setPlaylists', response)
        })
        .catch(err => console.log(err))
    },

    /**
     * Parse the youtube link
     */
    parseYoutubePlaylist(url) {
      let parsedURL = url.split('=')
      if (parsedURL.length < 2) {
        alert('Invalid URL')
        return ''
      } else {
        return parsedURL[1]
      }
    }
  },

  created() {
    this.getPlaylistsInDB()
  }
}
</script>

<style scoped>
.container {
  padding: 2%;
}
</style>
