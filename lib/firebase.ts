import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyD9bGOXlZnZyLS5CipqKsodunAopFmUAjw",
  authDomain: "untitledmmo-efba7.firebaseapp.com",
  projectId: "untitledmmo-efba7",
  storageBucket: "untitledmmo-efba7.appspot.com",
  messagingSenderId: "384009935466",
  appId: "1:384009935466:web:d11d197bdd21cb1de8c813",
  measurementId: "G-YEKJ7XWTLK"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();
const analytics = typeof window !== 'undefined' ? getAnalytics(app) : null;

export { app, auth, googleProvider, analytics };