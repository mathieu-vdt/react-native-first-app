import { app } from './connect'
import { child, get, getDatabase, onValue, ref, set } from "firebase/database";

const database = getDatabase(app);

export async function getTasksByColumnId(columnId) {
  try {
    const Tasks = ref(database, 'tasks');
    const tasksData = await new Promise((resolve, reject) => {
      onValue(Tasks, (snapshot) => {
        const data = snapshot.val();
        resolve(data);
      });
    });

    // Maintenant, filtrez les projets pour ne conserver que ceux de l'utilisateur spécifié
    const columnTasks = Object.values(tasksData).filter(
      (task) => task.columnId === columnId
    );

    return columnTasks;
  } catch (err) {
    console.error(err);
    throw new Error(err);
  }
}

export async function addTask(columnId, description) {
  try {
      const dbRef = ref(database);
      let snapshot = await get(child(dbRef, `tasks`))
      tasks = snapshot.val()
      if (tasks == null || tasks == "") {
        tasks = []
      }
      tasks.push(
          {
              id: tasks.length + 1,
              columnId:columnId, 
              description: description,
          }
      )
      set(ref(database, `tasks`), tasks);
      return tasks
  }
  catch (err) {
      console.error(err);
      throw new Error(err)
  }
}


export async function deleteTask(id) {
  try {
    const dbRef = ref(database);
    let snapshot = await get(child(dbRef, `tasks`));
    let tasks = snapshot.val();
    

    if (!tasks || tasks.length === 0) {
      throw new Error('Aucune tâche trouvé.');
    }

    const updatedTasks = tasks.filter(task => task.id !== id);
    
      set(ref(database, `tasks`), updatedTasks);

    return updatedTasks;
  } catch (err) {
    console.error('Erreur lors de la suppression de la tâche :', err);
    throw new Error(err);
  }
}