<template>
  <div class="playlist-page">
    <div class="playlist-header">
      <h1 class="title is-1">{{playlist.title}}</h1>
      <a @click="promptSongFormModal()" class="button is-info">Add Song</a>
    </div>
    <div>
      <PlaylistContainer :items="playlist.songs"/>
    </div>
  </div>
</template>

<script>
import PlaylistContainer from '../components/player/PlaylistContainer'
import db from '../database/'
import { mapState } from 'vuex'
import Youtube from '@/youtube'

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
    promptSongFormModal() {
      this.$dialog.prompt({
        message: 'Enter YouTube Video',
        inputAttrs: {
          placeholder: 'Youtube url'
        },
        onConfirm: value => this.getSongInfo(this.matchYoutubeUrl(value))
      })
    },

    /**
     * Add a song from parsed ID
     */
    getSongInfo(value) {
      if (value) {
        Youtube.getVideoDetails(value).then(res => {
          const title = res.data.items[0].snippet.title
          this.saveNewSong(title, value)
        })
      } else {
        alert('URL not valid')
      }
    },

    saveNewSong(title, videoId) {
      db.playlists
        .update(this.playlist.id, {
          songs: [
            ...this.playlist.songs,
            ...[{ title: title, videoId: videoId }]
          ]
        })
        .then(() => {
          this.getPlaylist()
          this.$toast.open('Song added')
        })
        .catch(err => console.log(err))
    },

    /**
     * Extract id from youtube URL
     */
    matchYoutubeUrl(url) {
      var p = /^(?:https?:\/\/)?(?:www\.)?(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))((\w|-){11})(?:\S+)?$/
      return url.match(p) ? RegExp.$1 : false
    },

    getPlaylist() {
      const id = Number(this.$route.params.id)
      db.playlists.get(id).then(value => {
        this.playlist = value
      })
    }
  },

  mounted() {
    this.getPlaylist()
  }
}
</script>

<style scoped lang="scss">
.playlist-header {
  display: flex;
  margin-left: 5px;
  h1.title {
    flex: 1;
  }
  .button {
    margin-top: 8px;
    justify-content: flex-end;
  }
}
</style>
