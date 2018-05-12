<template>
  <div class="home-page">
    <Header />
    <div class="container">
      <h1>Add new Playlist</h1>
      <div class="field">
        <div class="control">
          <input class="input is-primary" placeholder="Playlist title" type="text" v-model="playlistId">
        </div>
      </div>
      <div class="field">
        <div class="control">
          <input class="input is-primary" type="text" v-model="playlistTitle">
        </div>
      </div>
      <button class="button is-success is-rounded" @click="createPlaylist()">Get Playlist</button>
    </div>

    <hr>

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
    'Header': Header,
    'Playlist': Playlist
  },

  data() {
    return {
      playlistId: '',
      playlistTitle: 'Youtube playlist'
    }
  },

  methods: {
    createPlaylist() {
      youtube.getPlaylistItems(this.playlistId, undefined, this.playlistTitle)
      this.getPlaylistsInDB()
    },

    getPlaylistsInDB() {
      db.playlists
        .toArray()
        .then(response => {
          this.$store.commit('setPlaylists', response)
        })
        .catch(err => console.log(err))
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
