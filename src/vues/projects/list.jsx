import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, ScrollView, StatusBar, TouchableOpacity } from 'react-native';
import { Button } from 'react-native-paper';
import { blue, pink, white } from '../../components/colors';
import { ListItem, Avatar, LinearGradient } from '@rneui/base';
import ProjectCard from '../../components/cards/project';
import projectsData from '../../../assets/datas.json';
import { getAllProjects } from '../../api/projects';
import NewProjectForm from '../../components/modal/projectForm';

const ProjectList = ({ navigation }) => {
  const [selectedId, setSelectedId] = useState();
  const [projectData, setProjectData] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const toggleModal = () => {
    setIsModalVisible(true);
  };

  useEffect(() => {
    (async () => {
      try {
          const a = await getAllProjects()
          if (a) {
            setProjectData(a)
          }
      }
      catch (err) {
          Alert.alert(err)
      }
  })()
    
  }, []); 

  const renderItem = ({item}) => {
    const backgroundColor = item.id === selectedId ? '#6e3b6e' : '#f9c2ff';
    const color = item.id === selectedId ? 'white' : 'black';

    return (
      <ProjectCard navigation={navigation} item={item} />
    );
  };

  return (
    <ScrollView style={styles.container}>
      <FlatList
        data={projectData}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        extraData={selectedId}
        style={styles.list}
      />
      <Button icon="plus" mode="contained" onPress={() => toggleModal()} style={styles.addBtn}>Ajouter</Button>
      <NewProjectForm isOpen={isModalVisible} onClose={() => setIsModalVisible(!isModalVisible)}/>
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
},
});

export default ProjectList;
