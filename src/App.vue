<template>
  <div id="app">
    <Header/>
    <div class="columns is-mobile">
      <div class="column is-2-desktop is-3-tablet is-2-mobile">
        <Sidebar/>
      </div>

      <div class="column">
        <main>
          <router-view></router-view>
        </main>
      </div>
    </div>
    <Player />
  </div>
</template>

<script>
import Player from "./components/player/Player.vue";
import Sidebar from "./components/layout/Sidebar.vue";
import Header from './components/layout/Header.vue'

export default {
  components: {
    Player: Player,
    Sidebar: Sidebar,
    Header: Header
  },

  name: "app"
};
</script>

<style>
body {
  margin: 0;
}

#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}

.flat {
  background-color: transparent !important;
  border: none !important;
}
i.icon {
  padding: 4px;
  font-weight: bold;
}
</style>
