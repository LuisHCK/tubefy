<template>
  <div class="home-page">
    <div class="page-header">
      <h1 class="title is-1">Library</h1>
      <button @click="showPlaylistPromt()" class="button is-info">Add Playlist</button>
    </div>
    <div class="columns is-mobile is-multiline playlists-container">
      <div class="column is-2-desktop is-3-tablet is-half-mobile" v-for="(item, index) in playlists" :key="index">
        <PlaylistItem :title="item.title || 'Hello world'" :id="item.id" :cover="item.cover"/>
      </div>
    </div>
  </div>
</template>

<script>
import PlaylistItem from "../components/player/PlaylistItem.vue";
import Youtube from "../youtube/";
import db from "../database/";
import { mapState } from "vuex";

const youtube = new Youtube();

export default {
  components: {
    PlaylistItem: PlaylistItem
  },

  computed: mapState({
    playlists: state => state.playlists
  }),

  data() {
    return {
      playlistId: "",
      playlistTitle: "Youtube playlist",
      showForm: false
    };
  },

  methods: {
    /**
     * Show dialog promt to enter playlist url
     */
    showPlaylistPromt() {
      this.$dialog.prompt({
        message: "Enter YouTube Playlist URL",
        inputAttrs: {
          placeholder: "Youtube url"
        },
        onConfirm: value => this.createPlaylist(value)
      });
    },

    /**
     * Call the fuction in Youtub class and retrieve all songs
     * then stores in indexedDB and updates Vuex state
     */
    createPlaylist(playlistURL) {
      this.$toast.open('Loading Playlist')
      const parsedURL = this.parseYoutubePlaylist(playlistURL);
      youtube.getPlaylistDetails(parsedURL).then(res => {
        console.log(res.data.items[0].snippet.thumbnails.high.url)
        youtube.getPlaylistItems(
          parsedURL,
          undefined,
          res.data.items[0].snippet.title,
          res.data.items[0].snippet.thumbnails.high.url
        );
      });
    },

    /**
     * Get all playlist form local database and
     * tries to update Vuex store
     */
    getPlaylistsInDB() {
      db.playlists
        .toArray()
        .then(response => {
          this.$store.commit("setPlaylists", response);
        })
        .catch(err => console.log(err));
    },

    /**
     * Parse the youtube link
     */
    parseYoutubePlaylist(url) {
      let parsedURL = url.split("=");
      if (parsedURL.length < 2) {
        alert("Invalid URL");
        return "";
      } else {
        return parsedURL[1];
      }
    }
  },

  created() {
    this.getPlaylistsInDB();
  }
};
</script>

<style scoped lang="scss">
.container {
  padding: 2%;
}
.page-header {
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
