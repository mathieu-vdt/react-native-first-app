import React, { useState } from 'react';
import { View, FlatList, ScrollView, Text, StyleSheet, StatusBar } from 'react-native';
import { blue, white, pink } from '../../components/colors';
import ColumnCard from '../../components/cards/column';
const ProjectDetails = ({ route }) => {
  const { project } = route.params;

  const [selectedId, setSelectedId] = useState();

  const renderItem = ({item}) => {
    const backgroundColor = item.id === selectedId ? '#6e3b6e' : '#f9c2ff';
    const color = item.id === selectedId ? 'white' : 'black';

    return (
     <ColumnCard item={item}/>
    );
  };

  return (
    <ScrollView style={styles.container}>
      <FlatList
        data={project.columns}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        extraData={selectedId}
        style={styles.list}
      />
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
});

export default ProjectDetails;

