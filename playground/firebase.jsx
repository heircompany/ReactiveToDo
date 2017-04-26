import firebase from "firebase";

// Initialize Firebase
var config = {
  apiKey: "AIzaSyDFLZ-LtIpIUdFL_Pb-fI6haE0KEzCpLnY",
  authDomain: "reactive-todo.firebaseapp.com",
  databaseURL: "https://reactive-todo.firebaseio.com",
  projectId: "reactive-todo",
  storageBucket: "reactive-todo.appspot.com",
  messagingSenderId: "587707289406"
};
firebase.initializeApp(config);

// sample data hierarchy
{
  appName: Todo,
  isRunning: true
}

// set firebase data
// set WIPES ALL EXISTING DATA before rewriting
firebase.database().ref().set({
  appName: "Todo App",
  isRunning: true,
  user: {
    name: "Joe",
    age: 26
  }
  // can chain promises!
}).then(() => {
  console.log("set worked!");
}, (e) => {
  console.log("set failed!");
});

// creating data for children - access nested data subset
var firebaseRef = firebase.database().ref();
firebaseRef.child("user").set({
  name: "Mike"
});


firebaseRef.set({
  app: {
    name: "todoz",
    version: "1.0.0"
  },
  isRunning: true,
  user: {
    name: "Joey",
    age: 26
  },
  // ARRAYS are created as objects in Firebase
  // "array" is the array id
  todos: {
    "array": {
      text: "film some videos",
      user:
    }
  }
}).then(() => {
  console.log("set worked!");
}, (e) => {
  console.log("set failed!");
});

firebaseRef.child("app").set({
    name: "another todo app"
}).then(() => {
  console.log("set worked!");
}, (e) => {
  console.log("set failed!");
});

// update does not wipe data - it changes value
firebaseRef.update({
  isRunning: false
});

// multi path updating - directory path in one call
firebaseRef.update({
  isRunning: false,
  "app/name": "some new todo app",
  "user/name": "Benny the Jet Rodriguez"
});

// OR update children
firebaseRef.child("app").update({
  name: "some other app"
}).then(() => {
  console.log("set worked!");
}, (e) => {
  console.log("set failed!");
});

// REMOVE DATA
// wipe everything
firebaseRef.remove();

// wipe subsets
firebaseRef.child("app").remove();

// wipe even more specific stuff
firebaseRef.child("app/name").remove();

// or set to null in an update (firebase auto removes null data)
firebaseRef.child("app").update({
  version: "2.0.0",
  name: null
});

// fetch data by project or subsets - data retrieved is a SNAPSHOT
firebaseRef.once("value").then((snapshot) => {
  console.log("got entire database", snapshot.val());
}, (e) => {
  console.log("unable to fetch data", e);
});

// fetch subset of data under "app" , can get property key too
firebaseRef.child("app").once("value").then((snapshot) => {
  console.log("got entire database", snapshot.key, snapshot.val());
}, (e) => {
  console.log("unable to fetch data", e);
});

// listen for changes to database values
firebaseRef.on("value", (snapshot) => {
  console.log("got value", snapshot.val());
});

// stop listening for changes to values
firebaseRef.off();

firebaseRef.update({isRunning: false});

// can call children on listeners
firebaseRef.child("user").on("value", (snapshot) => {
  console.log("changed user", snapshot.val());
});

firebaseRef.child("user").update({name: "Joey"});

firebaseRef.child("app").update({name: "some other app"});

var notesRef = firebaseRef.child("notes");

// event listeners for add, change and remove
notesRef.on("child_added", (snapshot) => {
  console.log("child_added", snapshot.key, snapshot.val());
});

notesRef.on("child_changed", (snapshot) => {
  console.log("child_changed", snapshot.key, snapshot.val());
});

notesRef.on("child_removed", (snapshot) => {
  console.log("child_removed", snapshot.key, snapshot.val());
});

// PUSH ALLOWS YOU TO SET DIRECTLY
// var newNoteRef = notesRef.push();
// newNoteRef.set({
//   text: "walk the dog"
// });
var newNoteRef = notesRef.push({
  text: "walk other dog"
}).then(() => {
  console.log("set worked!");
}, (e) => {
  console.log("set failed!");
});

var todosRef = firebaseRef.child("todos");

todosRef.on("child_added", (snapshot) => {
  console.log("child_added", snapshot.key, snapshot.val());
});

var newNoteRef = notesRef.push({
  text: "todo1"
});

var newNoteRef = notesRef.push({
  text: "todo2"
});
