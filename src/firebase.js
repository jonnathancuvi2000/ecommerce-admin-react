// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDx3_Z4yxowK-vii3HVouj8XLMr7_7q8Kc",
  authDomain: "ecommerce-react-node-a74d8.firebaseapp.com",
  projectId: "ecommerce-react-node-a74d8",
  storageBucket: "ecommerce-react-node-a74d8.appspot.com",
  messagingSenderId: "670829432406",
  appId: "1:670829432406:web:b4ee6e7133eadcb27f35f7"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export default app;