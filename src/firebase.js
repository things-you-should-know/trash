import firebase from 'firebase'
const config = {
  apiKey: "AIzaSyDy8oRuRS0PYlKWHpe5or-Yow5ME14GUzk",
  authDomain: "things-you-should-know-f4f65.firebaseapp.com",
  databaseURL: "https://things-you-should-know-f4f65.firebaseio.com",
  projectId: "things-you-should-know-f4f65",
  storageBucket: "things-you-should-know-f4f65.appspot.com",
  messagingSenderId: "397488562791",
  appId: "1:397488562791:web:d15d1be5dad4c71e8a2ac2"
};
firebase.initializeApp(config);
export default firebase;