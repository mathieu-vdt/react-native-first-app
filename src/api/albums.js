import { app } from './connect'
import { child, get, getDatabase, onValue, ref, set } from "firebase/database";

const database = getDatabase(app);

export async function getAlbums(id) {
    try {
        const userAlbums = ref(database, `${id}/albums`);
        return new Promise((res, rej) => {
            onValue(userAlbums, (data) => {
                res(data.val())
            });
        })
    }
    catch (err) {
        console.error(err);
        throw new Error(err)
    }
}

export async function ajoutAlbum(id, nom) {
    try {
        const dbRef = ref(database);
        let snapshot = await get(child(dbRef, `${id}/albums`))
        albums = snapshot.val()
        if (albums == null || albums == "") {
            albums = []
        }
        albums.push({ nom, photos: [] })
        set(ref(database, `${id}/albums`), albums);
        return albums
    }
    catch (err) {
        console.error(err);
        throw new Error(err)
    }

}