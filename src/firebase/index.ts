import firebase from 'firebase/compat/app'
import { getFirestore } from 'firebase/firestore'

const firebaseApp = firebase.initializeApp({
    apiKey: 'AIzaSyAPPNcxsIBwb1HNlFUzHUbooTZ2B1yyyXo',
    authDomain: 'zspace-4426e.firebaseapp.com',
    projectId: 'zspace-4426e',
    storageBucket: 'zspace-4426e.appspot.com',
    messagingSenderId: '1082562273348',
    appId: '1:1082562273348:web:b27c6ff18894218058dc11',
    measurementId: 'G-7WRD8TVHWC',
})
const db = getFirestore(firebaseApp)

export default db
