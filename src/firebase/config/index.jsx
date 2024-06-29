import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
// Your web app's Firebase configuration

const firebaseConfig = {
  apiKey: "AIzaSyC-MqDsAsYQ02d36TmYf2ga1SBwtEe2f4U",
  authDomain: "hackathon-4a94a.firebaseapp.com",
  projectId: "hackathon-4a94a",
  storageBucket: "hackathon-4a94a.appspot.com",
  messagingSenderId: "619375509508",
  appId: "1:619375509508:web:073870f3927cc24014b551",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const storage = getStorage(app);
const auth = getAuth(app);
export { db, auth, storage };
