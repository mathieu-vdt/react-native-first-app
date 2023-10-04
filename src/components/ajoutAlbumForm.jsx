import React, { useContext, useState } from 'react';
import { View, StyleSheet, TextInput, TouchableOpacity, Text, Keyboard, Alert } from 'react-native';
import { styles as globalStyles } from '../styles';
import { ajoutAlbum } from '../api/albums';
import { PhotoContext } from '../context/photoContext';

const NewAlbumForm = () => {
    const [nom, setNom] = useState("")
    const { user, resfresh, setRefresh } = useContext(PhotoContext)

    const handleLogin = async () => {
        Keyboard.dismiss()
        try {
            if (nom) {
                await ajoutAlbum(user.uid, nom)
                setNom('')
                setRefresh(!resfresh)
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
        <View style={styles.container}>
            <Text style={globalStyles.titre}>Créer un album</Text>
            <TextInput placeholder="Nom" placeholderTextColor="#faf9f8"style={globalStyles.input} value={nom} onChangeText={setNom} />
            <TouchableOpacity style={globalStyles.btn} onPress={handleLogin}>
                <Text style={globalStyles.btnText}>Ajouter</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        alignItems: "center",
    }
})

export default NewAlbumForm;
