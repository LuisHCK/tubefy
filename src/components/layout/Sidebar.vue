<template>
  <div class="sidebar">
    <ul class="sidebar-item-list" @click="$router.push('/')">
      <li class="sidebar-item">
        <span class="icon">
          <i class="icon ion-ios-list"></i>
        </span>
        <span>Library</span>
      </li>
      <!-- <li class="sidebar-item" @click="seedPlaylists()">
        <i class="icon">s</i>
        <span>Seed</span>
      </li> -->
    </ul>
  </div>
</template>

<script>
import Seed from '../../database/seed.js'

export default {
  methods: {
    seedPlaylists() {
      Seed()
    }
  }
};
</script>

<style lang="scss">
.sidebar {
  background-color: #363636;
  color: white;
  height: 80vh;

  .sidebar-item-list {
    .sidebar-item {
      padding: 15px;
      cursor: pointer;
    }
    .sidebar-item:hover {
      background-color: #414141
    }
 
  }
}
</style>
