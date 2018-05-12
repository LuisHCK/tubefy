<template>
  <div id="app">
    <main>
      <router-view></router-view>
    </main>
    <Player />
  </div>
</template>

<script>
import Player from './components/player/Player.vue'

export default {
  components: {
    'Player': Player
  },

  name: 'app'
}
</script>

<style>
body {
  margin: 0;
}

#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}

.flat {
  background-color: transparent !important;
  border: none !important;
}
</style>
