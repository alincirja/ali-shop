import firebase from "firebase/app";

const firebaseConfig = {
    apiKey: "AIzaSyCwGxcf5FVojVbZ7XULMboWbSBPawl3Azw",
    authDomain: "ali-shop-f3a23.firebaseapp.com",
    databaseURL: "https://ali-shop-f3a23.firebaseio.com",
    projectId: "ali-shop-f3a23",
    storageBucket: "",
    messagingSenderId: "1043103312323",
    appId: "1:1043103312323:web:93053e99c9310563dfb576"
};

firebase.initializeApp(firebaseConfig);

export default firebase;