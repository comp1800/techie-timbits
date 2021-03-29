//---------------------------------------------------
// replace the lines below with your own "firebaseConfig"
// key value pairs
//--------------------------------------------------- 

// Your web app's Firebase configuration
var firebaseConfig = {
  apiKey: 
  authDomain: 
  projectId: 
  storageBucket:
  messagingSenderId: 
  appId:
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
// Get a reference to database
const db = firebase.firestore();
// Get a reference to the storage service, which is used to create references in your storage bucket
const storageRef = firebase.storage();