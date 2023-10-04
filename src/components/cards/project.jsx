import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity  } from 'react-native';
import { Button } from 'react-native-paper';
import { white, pink } from '../../components/colors';
import { Icon } from '@rneui/themed';
import projectsData from '../../../assets/datas.json';
import { IconButton, MD3Colors } from 'react-native-paper';

// import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const ProjectCard = ({ navigation, item }) => {
    const [isPressed, setIsPressed] = useState(false);
    const [isEditingTitle, setIsEditingTitle] = useState(false);
    const [isEditingDesc, setIsEditingDesc] = useState(false);

    const [editedTitle, setEditedTitle] = useState(item.title);
    const [editedDesc, setEditedDesc] = useState(item.description);


    const handlePress = () => {
        navigation.navigate('ProjectDetails', { project: item });
        setIsPressed(true);
    };

    const handleTitleChange = (text) => {
        setEditedTitle(text);
    };

    const handleDescChange = (text) => {
        setEditedDesc(text);
    };

    // Fonction pour sauvegarder les modifications dans le fichier JSON
    const saveChanges = async () => {
        console.log('OOOOK')
    };
    return (
        <TouchableOpacity
        onPress={handlePress}
        style={styles.item}
      >
        <View style={styles.container}>
          {isEditingTitle ? (
            <TextInput
                value={editedTitle}
                onChangeText={handleTitleChange}
                onBlur={saveChanges}
            />
            ) : (
                <Text style={styles.text}>{item.title}</Text>
            )}
            <IconButton
                icon="pencil"
                mode="contained"
                iconColor={white}
                style={styles.editBtn}
                onPress={() => setIsEditingTitle(!isEditingTitle)}
            />
          {/* <MaterialCommunityIcons name="chevron-right" size={24} color={white} /> */}
        </View>
        
        <View style={styles.container2}>
            {isEditingDesc ? (
                <TextInput
                    value={editedDesc}
                    multiline={true}
                    numberOfLines={4}
                    onChangeText={handleDescChange}
                    onBlur={saveChanges}
                />
            ) : (
                <Text style={styles.text2} numberOfLines={2} ellipsizeMode="tail">{item.description}</Text>
            )}
            <IconButton
                icon="pencil"
                mode="contained"
                iconColor={white}
                style={styles.editBtn}
                onPress={() => setIsEditingDesc(!isEditingDesc)}
            />
        </View>
      </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    container2: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',

        padding: 20
    },
    text: {
        fontSize: 22,
        color: white,
        opacity: 1,
    },
    text2: {
        fontSize: 18,
        color: white,
        opacity: 0.7,
    },
    item: {
        padding: 15,
        marginVertical: 8,
        marginHorizontal: 16,
        borderWidth:1,
        borderColor: pink,
        borderRadius: 12,
        backgroundColor: "#F5797F2D",
    },
    editBtn: {
        backgroundColor: 'transparent',
        color: white,
        fontSize: 24,
        textAlign:"center"
    }
});
export default ProjectCard;
