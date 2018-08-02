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
  },
  prevSongIndex: 0
}

const getters = {
  playlists: state => state.playlists,
  currentPlaylist: state => state.currentPlaylist,
  currentSongIndex: state => state.currentSongIndex,
  showNav: state => state.showNav,
  currentSong: state => state.currentSong,
  queue: state => state.queue,
  currentVideoId: state => state.currentVideoId,
  prevSongIndex: state => state.prevSongIndex
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

  setCurrentSongInfo(state, song) {
    state.currentSong = song
  },

  toggleNav(state) {
    state.showNav = ! state.showNav
  },

  setQueue(state, queue) {
    state.queue = queue
  },

  setCurrentVideoId(state, id) {
    state.currentVideoId = id
  },

  setPrevSongIndex(state, index) {
    state.prevSongIndex = index
  }
}

export default new Vuex.Store({
  state,
  getters,
  mutations
})