// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
// import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDGuEls_RL37jIsZVdA3R7BXfdtsYO1rUE",
  authDomain: "houseconstructioninventory.firebaseapp.com",
  databaseURL:
    "https://houseconstructioninventory-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "houseconstructioninventory",
  storageBucket: "houseconstructioninventory.appspot.com",
  messagingSenderId: "205196135010",
  appId: "1:205196135010:web:6df7b4c62efaf5dbfbdf3b",
  measurementId: "G-HE0Q31YK48",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);

// Get a reference to the database service
var database = getDatabase(app);

export default database;
