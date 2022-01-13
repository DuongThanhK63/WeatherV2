import React from 'react'
import { FirebaseError, initializeApp } from 'firebase/app';
import "firebase/auth";
import "firebase/database";
import "firebase/firestore";
import "firebase/functions";
import "firebase/storage";
import * as firebase from 'firebase';

const config = {  
      apiKey: "AIzaSyDGmR7nX8uRcOMfiewHQg2YS8YqQ-9c-as",
      authDomain: "weatherv2-5fca8.firebaseapp.com",
      databaseURL: "https://weatherv2-5fca8-default-rtdb.firebaseio.com",
      projectId: "weatherv2-5fca8",
      storageBucket: "weatherv2-5fca8.appspot.com",
      messagingSenderId: "15770291457",
      appId: "1:15770291457:web:0387f1c7b0bf0a5f02df00",
      measurementId: "G-ZF9SJVL2Z5",
};

if (!firebase.apps.length) {
      firebase.initializeApp(config);
  }
  
  export { firebase };
