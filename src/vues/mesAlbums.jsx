import React, { useContext, useEffect, useState } from 'react';
import { View, StyleSheet, Button, Alert, Text } from 'react-native';
import { PhotoContext } from '../context/photoContext';
import { getAlbums } from '../api/albums';

const MesAlbums = () => {
    const { setUser, user } = useContext(PhotoContext)
    const [albums, setAlbums] = useState([])
    const { resfresh } = useContext(PhotoContext)
    useEffect(() => {
        (async () => {
            try {
                const a = await getAlbums(user.uid)
                if (a) {
                    setAlbums(a)
                }
            }
            catch (err) {
                Alert.alert(err)
            }
        })()

    }, [resfresh]);
    return (
        <View style={styles.container}>
            {albums.map((album) => (<View><Text>{album.nom}</Text></View>))}
            <Button onPress={() => { setUser({}) }} style={styles.btnDeco} title='Se déconnecter' />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#1d3047',
        justifyContent: 'center',
    },

    btnDeco: {
        backgroundColor: "#f5797f",
        width: "90%",
        borderRadius: 8,
        padding: 10,
        justifyContent: 'center',
        alignItems: 'center'
    }
});
export default MesAlbums;
