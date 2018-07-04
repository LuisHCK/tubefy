import Vuex from 'vuex'
import Vue from 'vue'

Vue.use(Vuex)

const state = {
  playlists: [],
  currentPlaylist: {
    songs: []
  },
  currentSong: {
    title: 'Select a song',
    videoId: ''
  }, // index of current playlist item
  showNav: false,
  currentSongIndex: 0,
  queue: [],
  currentVideoId: undefined,
  settings: {
    random: false
  }
}

const getters = {
  playlists: state => state.playlists,
  currentPlaylist: state => state.currentPlaylist,
  currentSong: state => state.currentSong,
  currentSongIndex: state => state.currentSongIndex,
  showNav: state => state.showNav,
  queue: state => state.queue,
  currentVideoId: state => state.currentVideoId
}

const mutations = {
  setPlaylists(state, playlists) {
    state.playlists = playlists
  },

  setCurrentPlaylist(state, playlist) {
    state.currentPlaylist = playlist
  },

  addPlaylist(state, playlist) {
    state.playlists.push()
  },

  playSong(state, song) {
    state.currentSong = song
  },

  setCurrentSongIndex(state, index) {
    state.currentSongIndex = index
  },

  toggleNav(state) {
    state.showNav = ! state.showNav
  },

  setQueue(state, queue) {
    state.queue = queue
  },

  setCurrentVideoId(state, id) {
    state.currentVideoId = id
  }
}

export default new Vuex.Store({
  state,
  getters,
  mutations
})