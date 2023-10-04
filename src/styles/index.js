import { StyleSheet } from "react-native";
import { blue, pink, white, yellow } from '../components/colors'

export const styles = StyleSheet.create({
    titre: {
        color:pink,
        fontWeight: "bold",
        fontSize: 28,
        textAlign: 'center'
    },
    btn: {
        backgroundColor: pink,
        width: "90%",
        borderRadius: 8,
        padding: 10,
        justifyContent: 'center',
        alignItems: 'center'
    },
    btnText: {
        color: white,
        fontWeight: "bold",
        fontSize: 20
    },
    input: {
        width: "90%",
        marginVertical: 10,
        borderWidth: 1,
        borderRadius: 8,
        color: pink,
        borderColor: "#faf9f8",
        height: 40,
        paddingHorizontal: 10
    }
})
