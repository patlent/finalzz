import firebase from "firebase";
const firebaseConfig = {
    apiKey: "AIzaSyC-6dYiy8Ja_yTeuu387q05k5nOXODbiNQ",
    authDomain: "yuuy2-27a3e.firebaseapp.com",
    databaseURL: "https://yuuy2-27a3e.firebaseio.com",
    projectId: "yuuy2-27a3e",
    storageBucket: "yuuy2-27a3e.appspot.com",
    messagingSenderId: "640750541468",
    appId: "1:640750541468:web:79b665f73bd2df836fab59"

};


const fire=firebase.initializeApp(firebaseConfig);


export default fire;
