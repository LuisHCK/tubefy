import Dexie from 'dexie';

const db = new Dexie('wrkstation');
db.version(1).stores({
    videos: `++id, name, url, favorite`,
    playlists: '++id, title, *songs'
});

export default db;