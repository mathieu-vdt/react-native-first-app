import React, { useContext, useState } from 'react';
import { View, StyleSheet, TextInput, TouchableOpacity, Text, Keyboard, Alert } from 'react-native';
import { createUser } from '../api/user';
import { styles as globalStyles } from '../styles';
import { PhotoContext } from '../context/photoContext';
import { blue, pink, white, yellow } from './colors'

const InscriptionForm = () => {
    const [login, setLogin] = useState("")
    const [mdp, setMdp] = useState("")
    const [confirm, setConfirm] = useState("")
    const { setUser } = useContext(PhotoContext)
    const handleLogin = async () => {
        Keyboard.dismiss()
        if (mdp !== confirm) {
            Alert.alert('Les mots de passe sont différents')
        } else {
            try {
                setUser(await createUser(login, mdp))
            }
            catch (err) {
                setUser({})
                Alert.alert(err);
            }
        }
    }
    return (
        <View style={styles.container}>
            <Text style={globalStyles.titre}>Inscription</Text>
            <TextInput placeholder='email' placeholderTextColor={white} keyboardType='email-address' style={globalStyles.input} value={login} onChangeText={setLogin} />
            <TextInput placeholder='mot de passe' placeholderTextColor={white} secureTextEntry style={globalStyles.input} value={mdp} onChangeText={setMdp} />
            <TextInput placeholder='confirmez le mot de passe' placeholderTextColor={white} secureTextEntry style={globalStyles.input} value={confirm} onChangeText={setConfirm} />
            <TouchableOpacity style={globalStyles.btn} onPress={handleLogin}>
                <Text style={globalStyles.btnText}>S'enregistrer</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        alignItems: "center",
    }
})

export default InscriptionForm;
