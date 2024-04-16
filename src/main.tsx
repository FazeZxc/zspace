import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
// import firebase from 'firebase/compat/app'
import { CookiesProvider } from 'react-cookie'

// Use your config values here.
// firebase.initializeApp({
//     apiKey: 'AIzaSyAPPNcxsIBwb1HNlFUzHUbooTZ2B1yyyXo',
//     authDomain: 'zspace-4426e.firebaseapp.com',
//     projectId: 'zspace-4426e',
//     storageBucket: 'zspace-4426e.appspot.com',
//     messagingSenderId: '1082562273348',
//     appId: '1:1082562273348:web:b27c6ff18894218058dc11',
//     measurementId: 'G-7WRD8TVHWC',
// })

// export const db = firebase.firestore()

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <CookiesProvider>
            <App />
        </CookiesProvider>
    </React.StrictMode>
)
