import React from 'react';
import { View, StyleSheet } from 'react-native';
import InscriptionForm from '../components/inscriptionForm';

const Inscription = () => {
    return (
        <View style={styles.container}>
            <InscriptionForm />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#1d3047',
        justifyContent: 'center',
    },
});
export default Inscription;
