import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity  } from 'react-native';
import { white, pink, yellow } from '../colors';
// import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const TaskCard = ({ item }) => {

    return (
       <View style={styles.item}>
          <Text style={styles.text}>{item.description}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    item: {
        padding: 15,
        marginVertical: 8,
        marginHorizontal: 16,
        borderWidth:1,
        borderColor: yellow,
        borderRadius: 12,
        backgroundColor: "#ffe74d2D",
    },
    text: {
        fontSize: 18,
        color: white,
        opacity: 1,
    },
});
export default TaskCard;
