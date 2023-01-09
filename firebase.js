import * as firebase from "firebase/app";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyBQs225KxT8eXfOCw3RHuW_VoTfYkPtc7Y",
  authDomain: "arduino-b2dd1.firebaseapp.com",
  databaseURL: "https://arduino-b2dd1-default-rtdb.europe-west1.firebasedatabase.app/",
  projectId: "arduino-b2dd1",
  storageBucket: "arduino-b2dd1.appspot.com",
  messagingSenderId: "212728881231",
  appId: "1:212728881231:web:e8d01de29d7634ee994a3a",
};

firebase.initializeApp(firebaseConfig);

const database = getDatabase();
