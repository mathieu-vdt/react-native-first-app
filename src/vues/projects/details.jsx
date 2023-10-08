import React, { useContext, useState, useEffect } from 'react';
import { View, FlatList, ScrollView, Text, StyleSheet, StatusBar, Alert } from 'react-native';
import { Button } from 'react-native-paper';
import { blue, white, pink } from '../../components/colors';
import ColumnCard from '../../components/cards/column';
import { PhotoContext } from '../../context/photoContext';
import { getColumnsByProjectId } from '../../api/columns';
import ColumnForm from '../../components/modal/ColumnForm';

const ProjectDetails = ({ route }) => {
  const { project } = route.params;
  const [columnData, setColumnData] = useState([]);
  const { user, resfresh, setRefresh } = useContext(PhotoContext);
  const [selectedId, setSelectedId] = useState();
  const [isModalVisible, setIsModalVisible] = useState(false);

  const toggleModal = () => {
    setIsModalVisible(!isModalVisible);
  };

  useEffect(() => {
    const loadColumns = async () => {
      try {
        const columns = await getColumnsByProjectId(project.id);
        console.log(columns)
        if (columns && columns.length > 0) {
          setColumnData(columns);
        }else{
          setColumnData([]);
        }
      } catch (error) {
        Alert.alert(error);
      }
    };
  
    // Chargez les colonnes lorsque project.id change
    loadColumns();
  }, [project.id]); 

  const refreshColumns = async () => {
    try {
      const updatedColumn = await getColumnsByProjectId(project.id);
      
      if (updatedColumn) {
        setColumnData(updatedColumn);
      }
    } catch (err) {
      Alert.alert(err);
    }
  };

  const renderItem = ({item}) => {
    const backgroundColor = item.id === selectedId ? '#6e3b6e' : '#f9c2ff';
    const color = item.id === selectedId ? 'white' : 'black';

    return (
     <ColumnCard item={item} refreshColumns={refreshColumns}/>
    );
  };

  

  return (
    <ScrollView style={styles.container}>
      {columnData.length > 0 ? (
        <FlatList
        data={columnData}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        extraData={selectedId}
        style={styles.list}
      />
      ): null}
      
      <Button icon="plus" mode="contained" onPress={() => toggleModal()} style={styles.addBtn}>Ajouter</Button>
      <ColumnForm isVisible={isModalVisible} onClose={toggleModal} projectId={project.id} refreshColumns={refreshColumns}/>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: blue
  },
  list: {
    marginTop: StatusBar.currentHeight || 0,
    backgroundColor: 'transparent'
  },
  title: {
    fontSize: 32,
    color: white    
  },
  addBtn:{
    borderRadius: 12,
    padding: 10,
    marginVertical: 8,
    marginHorizontal: 16,
    backgroundColor: "transparent",
    color: white,
    shadowColor: "transparent"
  }
});

export default ProjectDetails;

