import React, { useContext, useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Alert, Pressable  } from 'react-native';
import { white, pink } from '../../components/colors';
import TaskCard from './task';
import { Button, IconButton } from 'react-native-paper';
import Modal from 'react-native-modal';
import { PhotoContext } from '../../context/photoContext';
import { getTasksByColumnId } from '../../api/tasks';
import { deleteColumn } from '../../api/columns';
import TaskForm from '../modal/TaskForm';
// import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const ColumnCard = ({ navigation, item, refreshColumns }) => {
    const [selectedId, setSelectedId] = useState();
    const [isModalVisible, setModalVisible] = useState(false);
    const { user, resfresh, setRefresh } = useContext(PhotoContext);
    const [taskData, setTaskData] = useState([]);

    const [isPressed, setIsPressed] = useState(false);

    const handlePress = () => {
        setIsPressed(!isPressed);
    };
    
    useEffect(() => {
        (async () => {
          try {
              const a = await getTasksByColumnId(item.id);
              if (a) {
                setTaskData(a)
              }
          }
          catch (err) {
              Alert.alert(err)
          }
      })()
        
      }, []); 
    
      const refreshTasks = async () => {
        try {
          const updatedTasks = await getTasksByColumnId(item.id);
          if (updatedTasks) {
            setTaskData(updatedTasks);
          }
        } catch (err) {
          Alert.alert(err);
        }
      };
    
  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

    const renderItem = ({item}) => {
        const backgroundColor = item.id === selectedId ? '#6e3b6e' : '#f9c2ff';
        const color = item.id === selectedId ? 'white' : 'black';
    
        return (
            <TaskCard item={item} refreshTasks={refreshTasks}/>
        );
      };
    // Condition pour vérifier si item.tasks est vide
    const renderTasks = () => {
        if (taskData.length <= 0) {
            return (
                <View>
                    <View style={styles.containerTitle}>
                        <Text style={styles.text}>{item.title}</Text>
                        {isPressed ? (
                            <View style={styles.btnContainer}>
                                <IconButton icon="close" mode="contained" color={white} onPress={handlePress} style={styles.closeDelete}></IconButton>
                                <IconButton icon="delete" mode="contained" color={white} onPress={() => {
                                    deleteColumn(item.id)
                                    refreshColumns()
                                }} style={styles.deleteColumn}></IconButton>
                             </View>
                        ): null}
                    </View>
                    <Text style={styles.textNoElement}>Aucune tache</Text>
                    <View style={{ flex: 1 }}>
                        <Button icon="plus" mode="contained" onPress={toggleModal} style={styles.addBtn}>Ajouter</Button>
                        <TaskForm isVisible={isModalVisible} onClose={toggleModal} columnId={item.id} refreshTasks={refreshTasks}/>
                    </View>
                </View>
            );
        }else{
            return (
                <View>
                    <View style={styles.containerTitle}>
                        <Text style={styles.text}>{item.title}</Text>
                        {isPressed ? (
                            <View style={styles.btnContainer}>
                                <IconButton icon="close" mode="contained" color={white} onPress={handlePress} style={styles.closeDelete}></IconButton>
                                <IconButton icon="delete" mode="contained" color={white} onPress={() => {
                                    deleteColumn(item.id)
                                    refreshColumns()
                                }} style={styles.deleteColumn}></IconButton>
                             </View>
                        ): null}
                    </View>
                    <FlatList
                        data={taskData}
                        renderItem={renderItem}
                        keyExtractor={item => item.id}
                        extraData={selectedId}
                    />
                    <View style={{ flex: 1 }}>
                        <Button icon="plus" mode="contained" onPress={toggleModal} style={styles.addBtn}>Ajouter</Button>
                        <TaskForm isVisible={isModalVisible} onClose={toggleModal} columnId={item.id} refreshTasks={refreshTasks}/>
                    </View>
                </View>
            );
        }

        
    };

    return (
    
     
     <View>
        {isPressed ? (
            <View style={styles.item}>
                <View>
                    {renderTasks()}
                    {/* <MaterialCommunityIcons name="chevron-right" size={24} color={white} /> */}
                </View>
            </View>
        
        ) : (
            <TouchableOpacity style={styles.item} onLongPress={handlePress}>
                <View>
                    {renderTasks()}
                    {/* <MaterialCommunityIcons name="chevron-right" size={24} color={white} /> */}
                </View>
            </TouchableOpacity>
        )}
    </View>    
    );
}

const styles = StyleSheet.create({
    item: {
        padding: 15,
        marginVertical: 8,
        marginHorizontal: 16,
        borderWidth:1,
        borderColor: pink,
        borderRadius: 12,
        backgroundColor: "#F5797F2D",
    },
    itemTask: {
        height:50,
        padding: 15,
        marginVertical: 8,
        marginHorizontal: 16,
        borderWidth:1,
        borderColor: pink,
        borderRadius: 12,
        backgroundColor: "#F5797F2D",
    },
    containerTitle:{
        display: "flex",
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    btnContainer:{
        display: "flex",
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    text: {
        fontSize: 22,
        color: white,
        opacity: 1,
    },
    textNoElement: {
        fontSize: 22,
        color: white,
        opacity: 1,
        textAlign: 'center',
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
    modalBtnClose:{
        borderRadius: 12,
        paddingVertical: 5,
        paddingHorizontal: 20,
        marginVertical: 8,
        marginHorizontal: 16,
        backgroundColor: pink,
        color: pink,
    },
    modal: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        alignContent:'center',
        backgroundColor: white,

    },
    deleteColumn:{
        textAlign:'center',
        backgroundColor: '#ff00002D',
        color:white
    },
    closeDelete:{
        textAlign:'center',
        backgroundColor: '#ff00002D',
        color:white
    }
});
export default ColumnCard;
