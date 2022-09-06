// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBodX2vJ0VNeTls9VdcUM9vUQt9YrQXzjg",
  authDomain: "song-finder-41270.firebaseapp.com",
  projectId: "song-finder-41270",
  storageBucket: "song-finder-41270.appspot.com",
  messagingSenderId: "638260752124",
  appId: "1:638260752124:web:a8876b721a79cb9a18b179"
};


// setting a variable that initializes our application
const firebase = initializeApp(firebaseConfig);
// this exports the CONFIGURED version of firebase
export default firebase;