import db from './index.js'

const dummyPlaylists = [
  {
    title: 'Playlist 1',
    songs: [
      "Song name 1", "Another song", "This another song is sic", "Add one more", "Just kidding this is the last"
    ]
  },
  {
    title: 'Rap Playlist',
    songs: [
      "Song name 1", "Another song", "This another song is sic", "Add one more", "Just kidding this is the last"
    ]
  },
  {
    title: 'Rock Playlist',
    songs: [
      "Song name 1", "Another song", "This another song is sic", "Add one more", "Just kidding this is the last"
    ]
  },

  {
    title: 'Indie Playlist 3',
    songs: [
      "Song name 1", "Another song", "This another song is sic", "Add one more", "Just kidding this is the last"
    ]
  }
]

export default function seed() {
  dummyPlaylists.map(playlist => {
    db.playlists.add(playlist).then(() => console.log('Playlist addedd'))
  })
}