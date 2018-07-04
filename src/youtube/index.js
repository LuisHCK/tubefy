import axios from 'axios'
import db from '../database/'
import store from '../store/'

const API_KEY = 'AIzaSyAJ1-y_cXzOzjWUUFYRBur1kA-0JNQQias'

const Axios = axios.create({
  baseURL: 'https://www.googleapis.com/youtube/v3/',
})

const FIELDS = "items(contentDetails/videoId,id,snippet(resourceId/videoId,title)),nextPageToken,pageInfo,prevPageToken,tokenPagination"

export default class Youtube {
  constructor() {
    this.playlistItems = []
  }

  getPlaylistItems(playlistId, nextPage = undefined, title = undefined, cover = undefined) {
    Axios.get('playlistItems', {
      params: {
        part: 'snippet',
        maxResults: 50,
        fields: FIELDS,
        playlistId: playlistId,
        key: API_KEY,
        pageToken: nextPage
      }
    })
      .then(response => {
        response.data.items.map(item => {
          this.playlistItems.push(item)
        })
        if (response.data.nextPageToken) {
          this.getPlaylistItems(playlistId, response.data.nextPageToken, title, cover)
        } else {
          this.processPlaylist(this.playlistItems, title, cover)
        }
      })
      .catch(err => {
        console.log(err)
      })
  }

  getPlaylistDetails(id) {
    return Axios.get('playlists', {
      params: {
        part: 'snippet',
        id: id,
        key: API_KEY
      }
    })
  }

  processPlaylist(items, title, cover) {
    let songs = []

    items.map(item => {
      songs.push({
        title: item.snippet.title || 'Youtube playlist',
        videoId: item.snippet.resourceId.videoId
      })
    })

    const playlist = {
      title: title,
      cover: cover,
      songs: songs
    }

    db.playlists.add(playlist).then(() => {
      alert('Playlist created successfully')
      // Update Vuex store state
      db.playlists.toArray().then(lists => {
        store.commit('setPlaylists', lists)
      })

      this.playlistItems = []
    })
  }

  test() {
    this.getPlaylistItems('PLb-I-6VXFXuG6hfsIF4mhGhSYozIphUXV')
  }
}