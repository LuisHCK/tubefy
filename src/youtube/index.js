import axios from 'axios'
import db from '../database/'
import store from '../store/'

const API_KEY = 'AIzaSyAJ1-y_cXzOzjWUUFYRBur1kA-0JNQQias'

const Axios = axios.create({
  baseURL: 'https://www.googleapis.com/youtube/v3/playlistItems',
})

const FIELDS = "items(contentDetails/videoId,id,snippet(resourceId/videoId,title)),nextPageToken,pageInfo,prevPageToken,tokenPagination"

export default class Youtube {
  constructor() {
    this.playListTiems = []
  }

  getPlaylistItems(playlistId, nextPage = undefined, title = undefined) {
    Axios.get('', {
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
          this.playListTiems.push(item)
        })
        if (response.data.nextPageToken) {
          this.getPlaylistItems(playlistId, response.data.nextPageToken, title)
        } else {
          this.processPlaylist(this.playListTiems, title)
        }
      })
      .catch(err => {
        console.log(err)
      })
  }

  processPlaylist(items, title) {
    let songs = []

    items.map(item => {
      songs.push({
        title: item.snippet.title || 'Youtube playlist',
        videoId: item.snippet.resourceId.videoId
      })
    })

    const playlist = {
      title: title,
      songs: songs
    }

    db.playlists.add(playlist).then(() => {
      alert('Playlist created successfully')
      // Update Vuex store state
      db.playlists.toArray().then(lists => {
        store.commit('setPlaylists', lists)
      })
    })
  }

  test() {
    this.getPlaylistItems('PLb-I-6VXFXuG6hfsIF4mhGhSYozIphUXV')
  }
}