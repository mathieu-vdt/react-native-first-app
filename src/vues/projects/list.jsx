import React, { useContext, useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, ScrollView, StatusBar, TouchableOpacity, Alert, RefreshControl  } from 'react-native';
import { Button } from 'react-native-paper';
import { blue, pink, white } from '../../components/colors';
import { ListItem, Avatar, LinearGradient } from '@rneui/base';
import ProjectCard from '../../components/cards/project';
import { getAllProjects, getProjectsByUserId } from '../../api/projects';
import NewProjectForm from '../../components/modal/projectForm';
import { PhotoContext } from '../../context/photoContext';

const ProjectList = ({ navigation }) => {
  const [selectedId, setSelectedId] = useState();
  const [projectData, setProjectData] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const { user, resfresh, setRefresh } = useContext(PhotoContext);

  const [isRefreshing, setIsRefreshing] = useState(false);


  const toggleModal = () => {
    setIsModalVisible(!isModalVisible);
  };
  
  const handleRefresh = async () => {
    setIsRefreshing(true);
  
    try {
      const updatedProjects = await getProjectsByUserId(user.uid);
      if (updatedProjects) {
        setProjectData(updatedProjects);
      }
    } catch (err) {
      Alert.alert(err);
    } finally {
      setIsRefreshing(false);
    }
    
  };

  
  useEffect(() => {
    (async () => {
      try {
          const a = await getProjectsByUserId(user.uid);
          if (a) {
            setProjectData(a)
          }
      }
      catch (err) {
          Alert.alert(err)
      }
  })()
    
  }, []); 

  const refreshProjects = async () => {
    try {
      const updatedProjects = await getProjectsByUserId(user.uid);
      if (updatedProjects) {
        setProjectData(updatedProjects);
      }
    } catch (err) {
      Alert.alert(err);
    }
  };
  

  const renderItem = ({item}) => {
    const backgroundColor = item.id === selectedId ? '#6e3b6e' : '#f9c2ff';
    const color = item.id === selectedId ? 'white' : 'black';

    return (
      <ProjectCard navigation={navigation} item={item} refreshProjects={refreshProjects}/>
    );
  };

  return (
    <ScrollView style={styles.container}>
      {
      projectData.length > 0 ? (
          <FlatList
          data={projectData}
          renderItem={renderItem}
          keyExtractor={item => item.id}
          extraData={selectedId}
          style={styles.list}
          refreshControl={
            <RefreshControl
              refreshing={isRefreshing}
              onRefresh={handleRefresh}
              tintColor={blue} // Couleur du loader de rafraîchissement
            />
          }
      />
      ): null
      }
      
      <Button icon="plus" mode="contained" onPress={() => toggleModal()} style={styles.addBtn}>Ajouter</Button>
      <NewProjectForm isVisible={isModalVisible} onClose={toggleModal} refreshProjects={refreshProjects}/>
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
},
});

export default ProjectList;
