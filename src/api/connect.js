// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyAAoPg5qKikl7nghQ-2SndgcEIBH9vpM-g",
    authDomain: "trello-mobile-react-native.firebaseapp.com",
    projectId: "trello-mobile-react-native",
    storageBucket: "trello-mobile-react-native.appspot.com",
    messagingSenderId: "82887044836",
    appId: "1:82887044836:android:b907eb903e362abca446f1",
    databaseURL: "https://trello-mobile-react-native-default-rtdb.firebaseio.com/"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);