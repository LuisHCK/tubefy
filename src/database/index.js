import Dexie from 'dexie';

const db = new Dexie('wrkstation');
db.version(1).stores({
    songs: `++id, name, url, favorite`,
    playlists: '++id, title, cover, *songs'
});

export default db;