import { getAuth, GoogleAuthProvider } from "firebase/auth"
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
    authDomain: "blog-app-562cc.firebaseapp.com",
    projectId: "blog-app-562cc",
    storageBucket: "blog-app-562cc.firebasestorage.app",
    messagingSenderId: "741512731479",
    appId: "1:741512731479:web:fc7bc44d93eed98144bc12",
    measurementId: "G-H9QQ5BQ7W2"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

const auth = getAuth(app)
const provider = new GoogleAuthProvider()

export { auth, provider }