import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity  } from 'react-native';
import { Button, IconButton } from 'react-native-paper';
import { white, pink, blue } from '../../components/colors';
import { Icon } from '@rneui/themed';
import projectsData from '../../../assets/datas.json';
import { deleteProject, editProjectTitle, editProjectDesc } from '../../api/projects';

import { Divider,Card, Title} from 'react-native-paper';

// import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const ProjectCard = ({ navigation, item, refreshProjects }) => {
    const [isPressed, setIsPressed] = useState(false);
    const [isEditingTitle, setIsEditingTitle] = useState(false);
    const [isEditingDesc, setIsEditingDesc] = useState(false);

    const [editedTitle, setEditedTitle] = useState(item.title);
    const [editedDesc, setEditedDesc] = useState(item.description);


    const handlePress = () => {
        navigation.navigate('project_details', { project: item });
        setIsPressed(true);
    };

    const handleTitleChange = (text) => {
        setEditedTitle(text);
    };

    const handleDescChange = (text) => {
        setEditedDesc(text);
    };

    // Fonction pour sauvegarder les modifications dans le fichier JSON
    const saveChangesTitle = async (item) => {
        editProjectTitle(item.id, editedTitle)
        refreshProjects()
        setIsEditingTitle(!isEditingTitle)
    };
    
    const saveChangesDesc = async (item) => {
        editProjectDesc(item.id, editedDesc)
        refreshProjects()
        setIsEditingDesc(!isEditingDesc)
    };

    return (
        <Card style={styles.Card}>
            <Card.Content>
                <View style={styles.container2}>
                    {isEditingTitle ? (
                        <View style={styles.inputContainer}>
                            <TextInput
                                value={editedTitle}
                                onChangeText={handleTitleChange}
                                style={styles.textInput}
                            />

                            <IconButton icon="check" mode="contained" iconColor={blue} onPress={()=>{
                                saveChangesTitle(item)
                            }} style={styles.editBtn}></IconButton>
                        </View>
                        
                        ) : (
                            <TouchableOpacity
                                onPress={()=>setIsEditingTitle(!isEditingTitle)}
                                style={styles.descBtn}
                            >
                                <Text style={styles.text}>{item.title}</Text>
                            </TouchableOpacity>
                            
                        )}
                    </View>
                <View style={styles.container2}>
                        {isEditingDesc ? (
                            
                                <View style={styles.inputContainer}>
                                    <TextInput
                                        value={editedDesc}
                                        multiline={true}
                                        numberOfLines={4}
                                        onChangeText={handleDescChange}
                                        style={styles.textInput2}
                                    />

                                    <IconButton icon="check" mode="contained" iconColor={blue} onPress={()=>{saveChangesDesc(item)}} style={styles.editBtn}></IconButton>
                                </View>
                            
                        ) : (
                            <TouchableOpacity
                                onPress={()=>setIsEditingDesc(!isEditingDesc)}
                                style={styles.descBtn}
                            >
                                <Text style={styles.text2} numberOfLines={1}>{item.description}</Text>
                            </TouchableOpacity>
                            
                        )}
                    </View>
            </Card.Content>
            <Card.Actions>
                <Button onPress={()=>{
                    deleteProject(item.id)
                    refreshProjects()
                }}>Supprimer</Button>
                <Button onPress={handlePress}>Voir</Button>
            </Card.Actions>
        </Card>
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
    },
    container3: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    Card:{
        backgroundColor: white,
        margin: 10
    },
    text: {
        fontSize: 22,
        color: blue,
        opacity: 1,
    },
    text2: {
        fontSize: 18,
        color: blue,
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
        color: blue,
        fontSize: 24,
        textAlign:"center"
    },
    textInput: {
        borderWidth: 1,
        fontSize: 22,
        color: blue,
        paddingHorizontal: 20,
        paddingVertical: 5,
        borderRadius: 12,
        borderColor: blue
    },

    textInput2: {
        borderWidth: 1,
        fontSize: 18,
        color: blue,
        paddingHorizontal: 20,
        paddingVertical: 5,
        borderRadius: 12,
        borderColor: blue
    },
    textBtn: {
        color: blue,
        backgroundColor: 'transparent'
    },
    descBtn:{
        overflow: 'hidden', 
        whiteSpace: 'nowrap',
        margin: 20
    },
    inputContainer:{
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
    }
});
export default ProjectCard;
