import React from 'react';
import { View, StyleSheet } from 'react-native';
import LoginForm from '../components/loginForm';
import { blue } from '../components/colors';


const Login = () => {
    return (
        <View style={styles.container}>
            <LoginForm />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: blue,
        justifyContent: 'center',
    },
});
export default Login;
