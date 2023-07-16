import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import 'firebase/compat/auth';

const firebaseConfig = {
  apiKey: "AIzaSyA8Bni8a9aiNldz_TAAYwx8ctUnNlVbv94",
  authDomain: "doctor-appointment-18ac6.firebaseapp.com",
  projectId: "doctor-appointment-18ac6",
  storageBucket: "doctor-appointment-18ac6.appspot.com",
  messagingSenderId: "517427627258",
  appId: "1:517427627258:web:556609f1474dd50827f543"
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

export const firestore = firebase.firestore();
export const auth = firebase.auth();
