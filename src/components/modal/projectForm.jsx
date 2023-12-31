import React, { useContext, useState } from 'react';
import { View, StyleSheet, TextInput, TouchableOpacity, Text, Keyboard, Alert } from 'react-native';
import { Button } from 'react-native-paper';
import { styles as globalStyles } from '../../styles'
import Modal from 'react-native-modal';
import { white, pink, blue } from '../colors';
import { addProject } from '../../api/projects';
import { PhotoContext } from '../../context/photoContext';

const NewProjectForm = ({ isVisible, onClose, refreshProjects}) => {
    const [nom, setNom] = useState('');
    const [description, setDescription] = useState('');
    const { user, resfresh, setRefresh } = useContext(PhotoContext);

    const handleAddProject = async () => {
        if (!nom) {
          Alert.alert('Veuillez entrer un nom de projet.');
          return;
        }
    
        try {
          await addProject(user.uid, nom, description);
          Alert.alert('Projet ajouté avec succès.');
          refreshProjects()
          setNom('');
          setDescription('');
          onClose();
        } catch (error) {
          console.error('Erreur lors de l\'ajout du projet :', error);
          Alert.alert('Une erreur s\'est produite lors de l\'ajout du projet.');
        }
    };

    return (
        <Modal 
            isVisible={isVisible}
            animationIn={'fadeIn'}
            animationOut={'fadeOut'}
            // onBackdropPress={onClose}
            style={styles.modal}
        >
            <View style={styles.containerMain}>
                <View style={styles.container}>
                    <Text style={styles.label}>Nom du projet :</Text>
                    <TextInput
                        style={styles.input}
                        value={nom}
                        onChangeText={text => setNom(text)}
                        placeholder="Entrez le nom du projet"
                    />

                    <Text style={styles.label}>Description :</Text>
                    <TextInput
                        style={styles.input}
                        value={description}
                        onChangeText={text => setDescription(text)}
                        placeholder="Entrez la description du projet"
                    />
                </View>
                <View style={styles.ContainerButton}>
                    <Button title="Ajouter le projet" mode="contained" onPress={handleAddProject} style={styles.modalBtnCreate}>Créer</Button>
                    <Button mode="contained" onPress={onClose} style={styles.modalBtnClose}>Fermer</Button>
                </View>
            </View>
            
        </Modal>
        
    );
}

const styles = StyleSheet.create({
    modal: {
        backgroundColor: 'transparent',
    },
    containerMain: {
        display: 'flex',
        backgroundColor: white,
        padding: 10,
        borderRadius:12
    },
    container: {
        display: 'flex',
        alignItems: "center",
    },
    ContainerButton:{
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center'
    },
    input:{
        color: blue,
        borderWidth: 1,
        borderRadius: 12,
        padding: 10,
        backgroundColor: "#ffffff",
        width: "90%"
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
    modalBtnCreate:{
        borderRadius: 12,
        paddingVertical: 5,
        paddingHorizontal: 20,
        marginVertical: 8,
        marginHorizontal: 16,
        backgroundColor: blue,
    }
})

export default NewProjectForm;
