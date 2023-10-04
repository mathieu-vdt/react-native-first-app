import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity  } from 'react-native';
import { white, pink } from '../../components/colors';
// import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const ProjectCard = ({ navigation, item }) => {
    const [isPressed, setIsPressed] = useState(false);

    const handlePress = () => {
        navigation.navigate('ProjectDetails', { project: item });
        setIsPressed(true);
    };

    return (
        <TouchableOpacity
        onPress={handlePress}
        style={styles.item}
      >
        <View style={styles.container}>
          <Text style={styles.text}>{item.title}</Text>
          {/* <MaterialCommunityIcons name="chevron-right" size={24} color={white} /> */}
        </View>
        <View style={styles.container2}>
          <Text style={styles.text2} numberOfLines={2} ellipsizeMode="tail">{item.description}</Text>
        </View>
      </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    container2: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',

        padding: 20
    },
    text: {
        fontSize: 22,
        color: white,
        opacity: 1,
    },
    text2: {
        fontSize: 18,
        color: white,
        opacity: 0.7,
    },
    item: {
        height:150,
        padding: 15,
        marginVertical: 8,
        marginHorizontal: 16,
        borderWidth:1,
        borderColor: pink,
        borderRadius: 12,
        backgroundColor: "#F5797F2D",
    },
});
export default ProjectCard;
