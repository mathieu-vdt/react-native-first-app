import React, { useContext, useState } from 'react';
import { View, StyleSheet, TextInput, TouchableOpacity, Text, Keyboard, Alert } from 'react-native';
import { connectUser } from '../api/user';
import { styles as globalStyles } from '../styles';
import { PhotoContext } from '../context/photoContext';
const LoginForm = () => {
    const [login, setLogin] = useState("")
    const [mdp, setMdp] = useState("")
    const { setUser } = useContext(PhotoContext)

    const handleLogin = async () => {
        Keyboard.dismiss()
        try {
            setUser(await connectUser(login, mdp))
        }
        catch (err) {
            setUser({})
            Alert.alert(err);
        }
    }
    return (
        <View style={styles.container}>
            <Text style={globalStyles.titre}>Connexion</Text>
            <TextInput placeholder="Email" placeholderTextColor="#faf9f8"  keyboardType='email-address' style={globalStyles.input} value={login} onChangeText={setLogin} />
            <TextInput placeholder='Mot de passe' placeholderTextColor="#faf9f8" secureTextEntry style={globalStyles.input} value={mdp} onChangeText={setMdp} />
            <TouchableOpacity style={globalStyles.btn} onPress={handleLogin}>
                <Text style={globalStyles.btnText}>Login</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        alignItems: "center",
        
    }
})

export default LoginForm;
