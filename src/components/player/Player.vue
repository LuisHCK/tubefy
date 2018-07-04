<template>
  <footer class="footer player-component">
    <div :class="{'player-hiden': hidePlayer, 'player-container': true}">
      <youtube
        :player-vars="playerVars"
        :video-id="currentVideoId"
        width="auto"
        height="200px"
        ref="youtube"
        @paused="paused"
        @playing="playing"
        @ended="nextSong" />
    </div>

    <div class="center-controls">
      <div class="stack-buttons">
        <!-- Shuffle -->
        <button class="button is-rounded is-outlined is-small">
          <span class="icon">
            <i class="icon ion-ios-shuffle"></i>
          </span>
        </button>

        <!-- Previous Song -->
        <button class="button is-rounded is-outlined" @click="changeSong('prev')">
          <span class="icon">
            <i class="icon ion-ios-skip-backward"></i>
          </span>
        </button>

        <!-- Play & Pause -->
        <button class="button is-rounded is-is-outlined is-large" @click="pauseVideo()">
          <span class="icon">
            <i class="ion ion-ios-pause" v-if="isPlaying"></i>
            <i class="ion ion-ios-play" v-else></i>
          </span>
        </button>

        <!-- Next Song -->
        <button class="button is-rounded is-outlined" @click="changeSong('next')">
          <span class="icon">
            <i class="icon ion-ios-skip-forward"></i>
          </span>
        </button>

        <!-- Repeat -->
        <button class="button is-rounded is-outlined is-small">
          <span class="icon">
            <i class="icon ion-ios-repeat"></i>
          </span>
        </button>


      </div>
    </div>

    <!-- <a class="button flat" style="float: right" @click="hidePlayer=!hidePlayer">
      <i class="material-icons">
        {{hidePlayer? 'keyboard_arrow_up':'keyboard_arrow_down'}}
      </i>
    </a> -->

    <!-- <progress class="progress is-warning" :value="progress" max="100"></progress> -->

    <!-- <div class="player-buttons">
      <button class="button" @click="playVideo()">
        <i class="material-icons">play_arrow</i>
      </button>
      <button class="button" @click="pauseVideo()">
        <i class="material-icons">pause</i>
      </button>
      <button class="button" @click="changeSong()">
        <i class="material-icons">skip_next</i>
      </button>
    </div>

    <div class="song-info">
      {{currentSong.title}}
    </div> -->

  </footer>
</template>

<script>
import { mapState } from "vuex";
import db from "../../database/";

export default {
  computed: mapState({
    player() {
      return this.$refs.youtube.player;
    },
    currentSong: state => state.currentSong,
    queue: state => state.queue,
    currentVideoId: state => state.currentVideoId,
    settings: state => state.settings
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
    };
  },

  methods: {
    /**
     * Reset vars and play the selected video
     */
    playVideo() {
      this.duration = 0;
      this.progress = 0;
      this.isPlaying = true;
      this.player.playVideo();
    },

    /**
     * When ins playing get the duration of video and
     * set the interval of update of current time
     */
    async playing() {
      let totalTime = await this.player.getDuration();
      this.processId = setInterval(() => {
        this.player.getCurrentTime().then(time => {
          let progress = time / totalTime * 100;
          this.progress = progress < 100 ? progress : 100;
          this.updateTime(time + 1);
        });
      }, 100);
      this.isPlaying = true
    },

    /**
     * Get the current minute and second of video
     */
    updateTime(time) {
      time = Math.round(time);
      let minutes = Math.floor(time / 60);
      let seconds = time - minutes * 60;
      seconds = seconds < 10 ? "0" + seconds : seconds;
      minutes = minutes < 10 ? "0" + minutes : minutes;
      this.time = minutes + ":" + seconds;
    },

    changeSong(action = "next") {
      // Normal playler reproduction
      if (this.settings.random) {
        // Randomize
        let nextSong = this.randomize(this.queue);
        this.$store.commit("setCurrentVideoId", nextSong);
      } else {
        // Get list length
        let listLength = this.queue.length;
        // Get current Video index
        let nextSong = undefined;
        // Normal sequence
        this.queue.map((item, index) => {
          if (item === this.currentVideoId) {
            if (listLength > index + 1) {
              // play next song
              if (action === "next") {
                nextSong = index + 1;

                // Play previous song
              } else if (action === "prev" && index - 1 >= 0) {
                nextSong = index - 1;
              } else {
                nextSong = 0;
              }
            }
          } else {
            nextSong = 0;
          }
        });
        this.$store.commit("setCurrentVideoId", this.queue[nextSong]);
      }
    },

    randomize(list = []) {
      return list[Math.floor(Math.random() * list.length)];
    },

    pauseVideo() {
      if (this.isPlaying) {
        this.player.pauseVideo();
      } else {
        this.playVideo()
      }
    },

    paused() {
      this.isPlaying = false;
      clearInterval(this.processId);
    }
  }
};
</script>

<style scoped lang="scss">
footer {
  padding: 1rem 1.5rem 1.5rem !important;
  position: fixed;
  left: 0;
  bottom: 0;
  right: 0;
  overflow: hidden;
  background-color: #607d8b;
  color: white;
}

.player-hiden {
  display: none;
}

.center-controls {
  display: flex;
  align-items: center;
  justify-content: center;

  .stack-buttons {
    display: flex;
    align-items: center;
    justify-content: center;
    button {
      margin: 5px;
    }
  }
}
</style>
