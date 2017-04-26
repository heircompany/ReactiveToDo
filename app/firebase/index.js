import firebase from "firebase";

// Initialize Firebase
try {
  var config = {
    apiKey: "AIzaSyDFLZ-LtIpIUdFL_Pb-fI6haE0KEzCpLnY",
    authDomain: "reactive-todo.firebaseapp.com",
    databaseURL: "https://reactive-todo.firebaseio.com",
    projectId: "reactive-todo",
    storageBucket: "reactive-todo.appspot.com",
    messagingSenderId: "587707289406"
  };
  firebase.initializeApp(config);
} catch (e) {
  
}

export var firebaseRef = firebase.database().ref();
export default firebase;
