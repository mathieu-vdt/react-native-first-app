import { app } from './connect'
import { child, get, getDatabase, onValue, ref, set, orderByChild, equalTo, query } from "firebase/database";

const database = getDatabase(app);

export async function getColumnsByProjectId(projectId) {
  try {
    const columnsRef = ref(database, 'columns');
    const columnsQuery = query(columnsRef, orderByChild('projectId'), equalTo(projectId));
    const columnsSnapshot = await get(columnsQuery);

    if (columnsSnapshot.exists()) {
      const columnsData = columnsSnapshot.val();
      const projectColumns = Object.values(columnsData);
      return projectColumns;
    } else {
      return [];
    }
  } catch (err) {
    console.error(err);
    throw new Error(err);
  }
}
  

  export async function addColumn(projectId, title) {
    try {
        const dbRef = ref(database);
        let snapshot = await get(child(dbRef, `columns`))
        columns = snapshot.val()
        if (columns == null || columns == "") {
          columns = []
        }
        columns.push(
            {
                id: columns.length + 1,
                projectId:projectId, 
                title: title,
            }
        )
        set(ref(database, `columns`), columns);
        return columns
    }
    catch (err) {
        console.error(err);
        throw new Error(err)
    }
  }

  export async function deleteColumn(id) {
    try {
      const dbRef = ref(database);
      let snapshot = await get(child(dbRef, `columns`));
      let columns = snapshot.val();
      
  
      if (!columns || columns.length === 0) {
        throw new Error('Aucune colonne trouvé.');
      }
  
      const updatedColumns = columns.filter(column => column.id !== id);
      
        set(ref(database, `columns`), updatedColumns);
  
      return updatedColumns;
    } catch (err) {
      console.error('Erreur lors de la suppression de la colonne :', err);
      throw new Error(err);
    }
  }
