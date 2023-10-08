import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity  } from 'react-native';
import { white, pink, yellow } from '../colors';
import { deleteTask } from '../../api/tasks';
import { Button, IconButton } from 'react-native-paper';
// import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const TaskCard = ({ item, refreshTasks }) => {
    const [isPressed, setIsPressed] = useState(false);

    const handlePress = () => {
        setIsPressed(!isPressed);
    };

    return (
        <View>
            {isPressed ? (
                <View style={styles.container}>
                    <Text style={styles.text}>{item.description}</Text>
                    <View style={styles.btnContainer}>
                        <IconButton icon="close" mode="contained" color={white} onPress={handlePress} style={styles.deleteTask}></IconButton>
                        <IconButton icon="delete" mode="contained" color={white} onPress={() => {
                            deleteTask(item.id)
                            refreshTasks()
                        }} style={styles.deleteTask}></IconButton>
                    </View>
                </View>
                
                ) : (
                    <TouchableOpacity style={styles.item} onLongPress={handlePress}>
                        <View>
                            <Text style={styles.text}>{item.description}</Text>
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
        borderColor: yellow,
        borderRadius: 12,
        backgroundColor: "#ffe74d2D",
    },
    text: {
        fontSize: 18,
        color: white,
        opacity: 1,
    },
    container:{
        display: "flex",
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 15,
        marginVertical: 8,
        marginHorizontal: 16,
        borderWidth:1,
        borderColor: yellow,
        borderRadius: 12,
        backgroundColor: "#ffe74d2D",
    },
    btnContainer:{
        display: "flex",
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    deleteTask:{
        textAlign:'center',
        backgroundColor: '#ff00002D'
    }
});
export default TaskCard;
