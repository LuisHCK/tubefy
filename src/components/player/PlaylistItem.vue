<template>
  <div class="card" @click="showPlaylist()">
        <div class="card-image">
      <figure class="image is-2by2">
        <img :src="require('@/assets/cover.png')" alt="playlist">
      </figure>
    </div>
    <div class="card-content">
      <div class="card-media">
        <div class="media-content">
          <b>{{title}}</b>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    title: {
      type: String
    },
    id: {}
  },

  methods: {
    showPlaylist() {
      this.$router.push('/playlist/' + this.id)
    }
  }
};
</script>

<style lang="scss">
</style>
