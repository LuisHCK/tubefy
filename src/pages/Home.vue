<template>
  <div class="home-page">
    <Header />
    <div class="container">
      <button class="button is-rounded is-primary" @click="showForm=!showForm">Add new Playlist</button>
      <v-form v-if="showForm">
        <div class="field">
          <div class="control">
            <input class="input is-primary" placeholder="Youtube Playlist URL" type="text" v-model="playlistId">
          </div>
        </div>
        <div class="field">
          <div class="control">
            <input class="input is-primary" type="text" placeholder="Playlist Title" v-model="playlistTitle">
          </div>
        </div>
        <button class="button is-success is-rounded" @click="createPlaylist()">Get Playlist</button>
      </v-form>
    </div>

    <div class="container">
      <Playlist />
    </div>
  </div>
</template>

<script>
import Header from '../components/layout/Header'
import Playlist from '../components/player/Playlist'
import Youtube from '../youtube/'
import db from '../database/'

const youtube = new Youtube()

export default {
  components: {
    Header: Header,
    Playlist: Playlist
  },

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
