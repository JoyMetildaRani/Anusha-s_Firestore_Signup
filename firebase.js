
import firebase from 'firebase'; // Import Firestore explicitly if not done already

const firebaseConfig = {
 apiKey: "AIzaSyD270Vfy90sFz04LAc8jRtTc8IUHwU9dkY",
  authDomain: "story-4dbe4.firebaseapp.com",
  databaseURL: "https://story-4dbe4-default-rtdb.firebaseio.com",
  projectId: "story-4dbe4",
  storageBucket: "story-4dbe4.appspot.com",
  messagingSenderId: "798968316533",
  appId: "1:798968316533:web:a231e16c3457ae0c4cee3c",
  measurementId: "G-ZG11R3B6RE"
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

export default firebase;

