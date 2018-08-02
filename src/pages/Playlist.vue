<template>
  <div class="playlist-page">
    <div class="playlist-header">
      <h1 class="title is-1">{{playlist.title}}</h1>
      <div class="button is-info">Add Song</div>
    </div>
    <div>
      <PlaylistContainer :items="playlist.songs"/>
    </div>
  </div>
</template>

<script>
import PlaylistContainer from "../components/player/PlaylistContainer";
import db from "../database/";
import { mapState } from "vuex";

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
    };
  },

  mounted() {
    const id = Number(this.$route.params.id);
    db.playlists.get(id).then(value => (this.playlist = value));
  }
};
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
