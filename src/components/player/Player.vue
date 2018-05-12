<template>
  <footer class="footer player-component">

    <a class="button flat" style="float: right" @click="hidePlayer=!hidePlayer">
      <i class="material-icons">
        {{hidePlayer? 'keyboard_arrow_up':'keyboard_arrow_down'}}
      </i>
    </a>

    <div :class="{'player-hiden': hidePlayer, 'player-container': true}">
      <youtube
        :player-vars="playerVars"
        :video-id="currentSong.videoId"
        ref="youtube"
        @paused="paused"
        @playing="playing"
        @ended="nextSong" />
    </div>

    <progress class="progress is-warning" :value="progress" max="100"></progress>

    <div class="player-buttons">
      <button class="button" @click="playVideo()">
        <i class="material-icons">play_arrow</i>
      </button>
      <button class="button" @click="pauseVideo()">
        <i class="material-icons">pause</i>
      </button>
      <button class="button" @click="nextSong()">
        <i class="material-icons">skip_next</i>
      </button>
    </div>

    <div class="song-info">
      {{currentSong.title}}
    </div>

  </footer>
</template>

<script>
import { mapState } from 'vuex'
import db from '../../database/'

export default {
  computed: mapState({
    player() {
      return this.$refs.youtube.player
    },
    currentPlaylist: state => state.currentPlaylist,
    currentSong: state => state.currentSong,
    currentSongIndex: state => state.currentSongIndex
  }),

  data() {
    return {
      playerVars: {
        autoplay: 1
      },
      songId: null,
      duration: 0,
      time: 0,
      progress: 0,
      processId: null,
      hidePlayer: true,
      isPlaying: false
    }
  },

  methods: {
    playVideo() {
      this.duration = 0
      this.progress = 0
      this.isPlaying = true
      this.player.playVideo()
    },

    async playing() {
      let totalTime = await this.player.getDuration()

      this.processId = setInterval(() => {
        this.player.getCurrentTime().then(time => {
          let progress = time / totalTime * 100

          this.progress = progress < 100 ? progress : 100
          this.updateTime(time + 1)
        })
      }, 100)
    },

    updateTime(time) {
      time = Math.round(time)
      let minutes = Math.floor(time / 60)
      let seconds = time - minutes * 60

      seconds = seconds < 10 ? '0' + seconds : seconds
      minutes = minutes < 10 ? '0' + minutes : minutes

      this.time = minutes + ':' + seconds
    },

    pauseVideo() {
      this.player.pauseVideo()
    },

    paused() {
      this.isPlaying = false
      clearInterval(this.processId)
    },

    /**
     * Play next song when current ends
     * or next button is pressed
     */
    nextSong() {
      let song = this.currentPlaylist.songs[this.currentSongIndex+1]
      this.$store.commit(
        'playSong',
        song
      )
      // Update index
      this.$store.commit('setCurrentSongIndex', this.currentSongIndex+1)
    },

    /**
     * Check if any currentPlaylist
     */
    checkCurrentPlaylist() {
      if (this.currentPlaylist.length < 1) {
        db.playlists.toArray(values => {
          let last = values.length - 1
          if (values.length >= 0) {
            this.$store.commit('setCurrentPlaylist', values[last])
          }
        })
      }
    }
  },

  mounted() {
    console.log(this.currentSongIndex)
    this.checkCurrentPlaylist()
    // Some settings over player
    this.player.setPlaybackQuality('small')
  }
}
</script>

<style scoped>
footer {
  padding: 1rem 1.5rem 2rem !important;
  position: fixed;
  left: 0;
  bottom: 0;
  right: 0;
  overflow: hidden;
  background-color: #607D8B;
  color: white;
}

.player-hiden {
  display: none;
}

.player-buttons, .song-info {
  text-align: center;
}
</style>
