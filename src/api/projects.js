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

export async function addProject(userId,nom, description) {
    try {
        const dbRef = ref(database);
        let snapshot = await get(child(dbRef, `projects`))
        projects = snapshot.val()
        if (projects == null || projects == "") {
            projects = []
        }
        projects.push(
            {
                id: projects.length + 1,
                userId:userId, 
                title: nom,
                description: description,
                columns: []
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

export async function deleteProject(id) {
    try {
      const dbRef = ref(database);
      let snapshot = await get(child(dbRef, `projects`));
      let projects = snapshot.val();
      
  
      if (!projects || projects.length === 0) {
        throw new Error('Aucun projet trouvé.');
      }
  
      const updatedProjects = projects.filter(project => project.id !== id);
      
        set(ref(database, `projects`), updatedProjects);
  
      return updatedProjects;
    } catch (err) {
      console.error('Erreur lors de la suppression du projet :', err);
      throw new Error(err);
    }
  }
  

export async function editProjectTitle(projectId, newTitle) {
    try {
        const dbRef = ref(database);
        let snapshot = await get(child(dbRef, `projects/${projectId}`));
        const projectToUpdate = snapshot.val();

        if (!projectToUpdate) {
            throw new Error('Projet non trouvé');
        }

        projectToUpdate.title = newTitle;

        await set(child(dbRef, `projects/${projectId}`), projectToUpdate);

        return projectToUpdate;
    } catch (error) {
        console.error('Erreur lors de la modification du projet :', error);
        throw new Error('Erreur lors de la modification du projet');
    }
}

export async function editProjectDesc(projectId, newDescription) {
    try {
        const dbRef = ref(database);
        let snapshot = await get(child(dbRef, `projects/${projectId}`));
        const projectToUpdate = snapshot.val();

        if (!projectToUpdate) {
            throw new Error('Projet non trouvé');
        }

        projectToUpdate.description = newDescription;

        await set(child(dbRef, `projects/${projectId}`), projectToUpdate);

        return projectToUpdate;
    } catch (error) {
        console.error('Erreur lors de la modification du projet :', error);
        throw new Error('Erreur lors de la modification du projet');
    }
}

export async function getProjectsByUserId(userId) {
  try {
    const Projects = ref(database, 'projects');
    const projectsData = await new Promise((resolve, reject) => {
      onValue(Projects, (snapshot) => {
        const data = snapshot.val();
        resolve(data);
      });
    });

    // Maintenant, filtrez les projets pour ne conserver que ceux de l'utilisateur spécifié
    const userProjects = Object.values(projectsData).filter(
      (project) => project.userId === userId
    );

    return userProjects;
  } catch (err) {
    console.error(err);
    throw new Error(err);
  }
}
