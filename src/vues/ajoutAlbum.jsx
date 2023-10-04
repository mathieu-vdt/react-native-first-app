import React, { useContext } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import NewAlbumForm from '../components/ajoutAlbumForm';


const AjoutAlbums = () => {
    return (
        <View style={styles.container}>
            <NewAlbumForm />
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
export default AjoutAlbums;
