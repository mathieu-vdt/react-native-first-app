import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Alert, Pressable  } from 'react-native';
import { white, pink } from '../../components/colors';
import TaskCard from './task';
import { Button } from 'react-native-paper';
import Modal from 'react-native-modal';
// import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const ColumnCard = ({ navigation, item }) => {
    const [selectedId, setSelectedId] = useState();
    const [isModalVisible, setModalVisible] = useState(false);

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

    const renderItem = ({item}) => {
        const backgroundColor = item.id === selectedId ? '#6e3b6e' : '#f9c2ff';
        const color = item.id === selectedId ? 'white' : 'black';
    
        return (
            <TaskCard item={item} />
        );
      };
    // Condition pour vérifier si item.tasks est vide
    const renderTasks = () => {
        if (item.tasks.length === 0) {
            return <Text style={styles.textNoElement}>Aucun élément</Text>;
        }

        return (
            <View>
                <Text style={styles.text}>{item.title}</Text>
                <FlatList
                    data={item.tasks}
                    renderItem={renderItem}
                    keyExtractor={item => item.id}
                    extraData={selectedId}
                />
                <View style={{ flex: 1 }}>
                    <Button icon="plus" mode="contained" onPress={toggleModal} style={styles.addBtn}>Ajouter</Button>
                
                    <Modal 
                    isVisible={isModalVisible}
                    animationIn={'fadeIn'}
                    animationOut={'fadeOut'}
                    style={styles.modal}
                    >
                        <View>
                        <Text style={styles.text}>Hello!</Text>

                        <Button mode="contained" onPress={toggleModal} style={styles.modalBtnClose}>Fermer</Button>
                        </View>
                    </Modal>
                </View>
            </View>
        );
    };

    return (
       <View style={styles.item}>
           {renderTasks()}
          {/* <MaterialCommunityIcons name="chevron-right" size={24} color={white} /> */}
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

    }
});
export default ColumnCard;
