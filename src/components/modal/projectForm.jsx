import React, { useContext, useState } from 'react';
import { View, StyleSheet, TextInput, TouchableOpacity, Text, Keyboard, Alert } from 'react-native';
import { Button } from 'react-native-paper';
import { addProject } from '../../api/projects';
import { styles as globalStyles } from '../../styles'
import Modal from 'react-native-modal';
import { white, pink } from '../colors';

const NewProjectForm = ({ isOpen }) => {
    const [nom, setNom] = useState("")
    const [isVisible, setVisible] = useState(isOpen);

    const toggleModal = () => {
        setVisible(!isVisible);
    };

    const handleLogin = async () => {
        Keyboard.dismiss()
        try {
            if (nom) {
                await addProject(nom, "description")
                setNom('')
                Alert.alert('Album créé')
            }
            else {
                Alert.alert('Veuillez remplir le nom de l\'album')
            }
        }
        catch (err) {
            Alert.alert(err);
        }
    }
    return (
        <Modal 
            isVisible={isVisible}
            animationIn={'fadeIn'}
            animationOut={'fadeOut'}
            style={styles.modal}
        >
            <View style={styles.container}>
                <Text style={globalStyles.titre}>Créer un album</Text>
                <TextInput placeholder="Nom" placeholderTextColor="#faf9f8"style={globalStyles.input} value={nom} onChangeText={setNom} />
                <TouchableOpacity style={globalStyles.btn} onPress={handleLogin}>
                    <Text style={globalStyles.btnText}>Ajouter</Text>
                </TouchableOpacity>
                <Button mode="contained" onPress={toggleModal} style={styles.modalBtnClose}>Fermer</Button>
            </View>
            
        </Modal>
        
    );
}

const styles = StyleSheet.create({
    container: {
        alignItems: "center",
    },
    modal: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        alignContent:'center',
        backgroundColor: white,
    },
    modalBtnClose:{
        borderRadius: 12,
        paddingVertical: 5,
        paddingHorizontal: 20,
        marginVertical: 8,
        marginHorizontal: 16,
        backgroundColor: pink,
        color: pink,
    }
})

export default NewProjectForm;
