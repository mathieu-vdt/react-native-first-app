import { app } from './connect'
import { child, get, getDatabase, onValue, ref, set } from "firebase/database";

const database = getDatabase(app);

export async function getProjects(id) {
    try {
        const userProjects = ref(database, `${id}/projects`);
        return new Promise((res, rej) => {
            onValue(userProjects, (data) => {
                res(data.val())
            });
        })
    }
    catch (err) {
        console.error(err);
        throw new Error(err)
    }
}

export async function getAllProjects() {
    try {
        const Projects = ref(database, `projects`);
        return new Promise((res, rej) => {
            onValue(Projects, (data) => {
                res(data.val())
            });
        })
    }
    catch (err) {
        console.error(err);
        throw new Error(err)
    }
}

export async function addProject(nom, description) {
    try {
        const dbRef = ref(database);
        let snapshot = await get(child(dbRef, `projects`))
        projects = snapshot.val()
        if (projects == null || projects == "") {
            projects = []
        }
        projects.push(
            {
                id: projects.length + 1, // Générez un nouvel ID unique (par exemple, en fonction de la longueur de la liste)
                title: nom,
                description: description,
                columns: [

                ]
            }
        )
        set(ref(database, `projects`), projects);
        return projects
    }
    catch (err) {
        console.error(err);
        throw new Error(err)
    }
}