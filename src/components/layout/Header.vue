<template>
<nav class="navbar is-dark">
      <div class="navbar-brand">
        <a class="navbar-item" href="/">
          <img src="https://s3.us-east-2.amazonaws.com/elasticbeanstalk-us-east-2-937989723734/assets/apple-touch-icon.png" alt="Logo">
        </a>
        <!--
    Using the v-on: directive to listen for the click event and toggle the data property showNav. Also, using the v-bind: directive to reactively update the class attribute 'is-active' based on the showNav property.
    -->
        <div class="navbar-burger" @click="toggleNav()" :class="{ 'is-active': showNav }">
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>
      <!--
    Using the v-bind: directive to reactively update the class attribute 'is-active' based on the showNav property.
    -->
      <div class="navbar-menu" :class="{ 'is-active': showNav }">
        <div class="navbar-end">
          <a class="navbar-item" target="_blank" href="https://luishck.github.io/">
            About
          </a>
          <a class="navbar-item" target="_blank" href="https://luishck.github.io/posts/">
            Blog
          </a>
          <a class="navbar-item" target="_blank" href="https://github.com/LuisHCK/tubefy">
            Fork me on GitHub ❤
          </a>
        </div>
      </div>
    </nav>
</template>

<script>
import { mapState } from 'vuex'

export default {
  computed: mapState({
    showNav: state => state.showNav
  }),

  data() {
    return {

    }
  },

  methods: {
    /**
     * Show or hide Navbar
     */
    toggleNav() {
      this.$store.commit('toggleNav')
    }
  }
}
</script>

<style scoped lang="scss">
nav {
  min-height: 42px;
}
.navbar-burger {
  color: white;
}
</style>
