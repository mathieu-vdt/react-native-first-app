import React, { useContext, useState } from 'react';
import { View, StyleSheet, TextInput, TouchableOpacity, Text, Keyboard, Alert } from 'react-native';
import { Button } from 'react-native-paper';
import Modal from 'react-native-modal';
import { white, pink, blue } from '../colors';
import { addColumn } from '../../api/columns';
import { PhotoContext } from '../../context/photoContext';

const ColumnForm = ({ isVisible, onClose, projectId, refreshColumns}) => {
    const [title, setTitle] = useState('');
    const { user, resfresh, setRefresh } = useContext(PhotoContext);

    const handleAddColumn = async () => {
        if (!title) {
          Alert.alert('Veuillez entrer un nom de colonne.');
          return;
        }
    
        try {
          await addColumn(projectId, title);
          Alert.alert('Projet ajouté avec succès.');
          refreshColumns()
          setTitle('');
          onClose();
        } catch (error) {
          console.error('Erreur lors de l\'ajout de la colonne :', error);
          Alert.alert('Une erreur s\'est produite lors de l\'ajout de la colonne.');
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
                        value={title}
                        onChangeText={text => setTitle(text)}
                        placeholder="Entrez le nom de la colonne"
                    />
                </View>
                <View style={styles.ContainerButton}>
                    <Button title="Ajouter la colonne" mode="contained" onPress={handleAddColumn} style={styles.modalBtnCreate}>Créer</Button>
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

export default ColumnForm;
